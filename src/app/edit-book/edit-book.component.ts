import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  bookForm: FormGroup;
  bookId: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.bookId = this.route.snapshot.paramMap.get('id') as string;
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: [''],
      yearOfRelease: [''],
      genre: [''],
      isbn: [''],
      quantity: ['']
    });
    this.loadBookDetails();
  }

  loadBookDetails(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.bookForm.patchValue(book);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }
    this.bookService.updateBook(this.bookId, this.bookForm.value).subscribe({
      next: () => {
        console.log('Book updated successfully');
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }
}

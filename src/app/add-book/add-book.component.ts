import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      yearOfRelease: ['', Validators.required],
      genre: ['', Validators.required],
      isbn: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }
    this.bookService.addBook(this.bookForm.value).subscribe({
      next: () => {
        console.log('Book added successfully');
        this.bookForm.reset();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }
}

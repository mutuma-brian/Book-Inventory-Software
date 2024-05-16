import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  bookId: string;

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.bookId = this.route.snapshot.paramMap.get('id') as string;

  }

  onDelete(): void {
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        console.log('Book deleted successfully');
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }
}

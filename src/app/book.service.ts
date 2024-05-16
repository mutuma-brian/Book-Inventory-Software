import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addBook(bookData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/books`, bookData);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  updateBook(id: string, bookData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/books/${id}`, bookData);
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/books/${id}`);
  }
}

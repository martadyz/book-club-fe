import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AddBookDialogData, Book, BookSort } from "../models/book.model";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/books`;

  getBooks(sort: BookSort): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?sort=${sort.field},${sort.direction}`,
      {
        withCredentials: true
      });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(
      `${this.apiUrl}/${id}`);
  }

  addBook(book: AddBookDialogData): Observable<AddBookDialogData> {
    return this.http.post<AddBookDialogData>(`${this.apiUrl}`, book);
  }
}
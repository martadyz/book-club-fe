import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../../environments/environment.production";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/books`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(
      `${this.apiUrl}/${id}`);
  }
}
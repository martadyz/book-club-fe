import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.production";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RatingsApi {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/ratings`;

      rateBook(bookId: number, score: number): Observable<void> {
        return this.http.post<void>(
          `${this.apiUrl}`,
          { bookId, score }
        );
      }
    
      updateRateBook(bookId: number, score: number): Observable<void> {
        return this.http.put<void>(
          `${this.apiUrl}`,
          { bookId, score }
        );
      }

      rateBookByAdmin(bookId: number, score: number, memberId: number): Observable<void> {
        return this.http.post<void>(
          `${this.apiUrl}/admin`,
          { memberId, bookId, score }
        );
      }
    
      updateRateBookByAdmin(bookId: number, score: number, memberId: number): Observable<void> {
        return this.http.put<void>(
          `${this.apiUrl}/admin`,
          {memberId, bookId, score }
        );
      }
}
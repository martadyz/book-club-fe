import { inject, signal } from "@angular/core";
import { RatingsApi } from "./ratings.api";
import { BooksApi } from "../../books/data-access/books.api";
import { BooksStore } from "../../books/data-access/books.store";

export class RatingsStore {
    private readonly api = inject(RatingsApi);
    private readonly booksStore = inject(BooksStore);
    private readonly _loading = signal(false); 
    private readonly _error = signal<string | null>(null);

    readonly loading = this._loading.asReadonly(); 
    readonly error = this._error.asReadonly();

    
  updateRateBook(bookId: number, score: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.updateRateBook(bookId, score).subscribe({
      next: () => {
        this._loading.set(false);
        this.booksStore.loadBooks();
      },
      error: () => {
        this._loading.set(false);
        this._error.set('Nie udało się zaktualizować oceny');
      }
    });
  }

  rateBook(bookId: number, score: number): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.rateBook(bookId, score).subscribe({
      next: () => {
        this._loading.set(false);
        this.booksStore.loadBooks();
      },
      error: () => {
        this._loading.set(false);
        this._error.set('Nie udało się zapisać oceny');
      }
    });
  }
}
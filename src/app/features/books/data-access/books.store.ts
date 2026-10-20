import { computed, inject, signal } from "@angular/core";
import { BooksApi } from "./books.api";
import { Book } from "../models/book.model";

export class BooksStore {
  private readonly api = inject(BooksApi);

  private readonly _books = signal<Book[]>([]);
  private readonly _loading = signal(false);
  private readonly _savingRating = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly books = this._books.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly savingRating = this._savingRating.asReadonly();
  readonly error = this._error.asReadonly();

  readonly booksCount = computed(
    () => this._books().length
  );

  loadBooks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getBooks().subscribe({
      next: books => {
        this._books.set(books);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Could not load books');
        this._loading.set(false);
      }
    });
  }

  // updateRateBook(bookId: number, score: number): void {
  //   this._savingRating.set(true);
  //   this._error.set(null);

  //   this.api.updateRateBook(bookId, score).subscribe({
  //     next: () => {
  //       this._savingRating.set(false);
  //       this.loadBooks();
  //     },
  //     error: () => {
  //       this._savingRating.set(false);
  //       this._error.set('Nie udało się zaktualizować oceny');
  //     }
  //   });
  // }

  // rateBook(bookId: number, score: number): void {
  //   this._savingRating.set(true);
  //   this._error.set(null);

  //   this.api.rateBook(bookId, score).subscribe({
  //     next: () => {
  //       this._savingRating.set(false);
  //       this.loadBooks();
  //     },
  //     error: () => {
  //       this._savingRating.set(false);
  //       this._error.set('Nie udało się zapisać oceny');
  //     }
  //   });
  // }
}
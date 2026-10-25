import { computed, inject, signal } from "@angular/core";
import { BooksApi } from "./books.api";
import { AddBookDialogData, Book, BookSort } from "../models/book.model"; 
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { catchError, of, switchMap, tap } from "rxjs";

export const defaultSort: BookSort = {
  field: 'meetingDate',
  direction: 'desc'
}
export class BooksStore {
  private readonly api = inject(BooksApi);

  private readonly _books = signal<Book[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _sort = signal<BookSort>(defaultSort);

  readonly books = this._books.asReadonly();
  readonly loading = this._loading.asReadonly(); 
  readonly error = this._error.asReadonly();
  readonly sort = this._sort.asReadonly();

  readonly booksCount = computed(
    () => this._books().length
  );
  
  constructor() {
    toObservable(this._sort)
      .pipe(
        tap(() => {
          this._loading.set(true);
          this._error.set(null);
        }),
        switchMap(sort =>
          this.api.getBooks(sort).pipe(
            catchError(() => {
              this._error.set('Nie udało się pobrać książek');
              return of([]);
            })
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe(books => {
        this._books.set(books);
        this._loading.set(false);
      });
  }
  
  setSort(sort: BookSort): void {
    this._sort.set(sort);
  }

  loadBooks(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getBooks(this.sort()).subscribe({
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

  addBook(book: AddBookDialogData): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.addBook(book).subscribe({
      next: books => {
        this.loadBooks();
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Could not add book');
        this._loading.set(false);
      }
    });
  }
}
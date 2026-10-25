import { Component, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BookSort, BookSortField, SortDirection } from '../../models/book.model';

@Component({
  selector: 'app-books-sort',
  imports: [MatButton],
  templateUrl: './books-sort.html',
  styleUrl: './books-sort.scss',
})
export class BooksSort {
  readonly sort = input.required<BookSort>();
  readonly sortChange = output<BookSort>();

  onSortChange(field: BookSortField, direction: SortDirection) {
    this.sortChange.emit({ field, direction });
  }
}

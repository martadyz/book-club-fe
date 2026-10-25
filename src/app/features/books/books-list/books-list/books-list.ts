import { Component, ChangeDetectionStrategy, inject, signal, NgZone, ChangeDetectorRef, OnInit } from "@angular/core";
import { BooksStore } from "../../data-access/books.store";
import { AuthStore } from "../../../../core/auth/auth.store";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { RatingClassDirective } from "../../../../shared/directives/rating-class.directive";
import { DatePipe, formatDate } from '@angular/common';
import { MembersStore } from "../../../members/data-access/members.store";
import { Book } from "../../models/book.model";
import { MatDialog } from "@angular/material/dialog";
import { BookRatingDialog } from "../book-rating-dialog/book-rating-dialog";
import { RatingsStore } from "../../../ratings/data-access/ratings.store";
import { AddBookDialog } from "../add-book-dialog/add-book-dialog";
import '@angular/common/locales/global/pl';
import { NumberInput } from "@angular/cdk/coercion";
import { BooksSort } from '../books-sort/books-sort';

@Component({
  selector: 'app-books-list',
  standalone: true,
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
  imports: [
    MatExpansionModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAccordion,
    RatingClassDirective,
    DatePipe,
    BooksSort
  ],
  providers: [BooksStore, MembersStore, RatingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {
  readonly bookStore = inject(BooksStore);
  readonly ratingsStore = inject(RatingsStore);
  readonly membersStore = inject(MembersStore);
  readonly authStore = inject(AuthStore);
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal(false);

  saveRating(bookId: number, score: number, memberId?: number): void {
    this.ratingsStore.rateBook(bookId, score, memberId);
  }

  updateRating(bookId: number, score: number, memberId?: number): void {
    this.ratingsStore.updateRateBook(bookId, score, memberId);
  }

  openAddBookDialog(): void {
     const dialogRef = this.dialog.open(AddBookDialog, {
      data: { title: '', meetingDate: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bookStore.addBook({
        title: result.title,
        meetingDate:  formatDate(result.meetingDate, 'yyyy-MM-dd', 'pl-PL')
      }); 
    });

  }

  openRatingDialog(bookId: number, score: number, memberId?: number): void {
    const dialogRef = this.dialog.open(BookRatingDialog, {
      data: { score },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (score !== 0) {
          this.updateRating(bookId, result, memberId);
        } else {
          this.saveRating(bookId, result, memberId);
        }
      }
    });
  }

  getRating(book: Book, memberId: number): number {
    const rating = book.ratings.find(rating => rating.memberId === memberId);
    return rating ? rating.memberRating : 0;
  }

  ngOnInit(): void {
   // this.bookStore.loadBooks();
    this.membersStore.loadMembers();
    console.log(this.authStore.isAdmin());
  }

}
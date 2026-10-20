import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { BookRatingDialogData } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-rating-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './book-rating-dialog.html',
  styleUrl: './book-rating-dialog.scss',
})
export class BookRatingDialog {
  readonly dialogRef = inject(MatDialogRef<BookRatingDialog>);
  readonly data = inject<BookRatingDialogData>(MAT_DIALOG_DATA);
}

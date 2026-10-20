import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddBookDialogData } from '../../models/book.model';
import { MatNativeDateModule } from '@angular/material/core';

import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-add-book-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule, 
    MatNativeDateModule 
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-book-dialog.html',
  styleUrl: './add-book-dialog.scss',
})
export class AddBookDialog {
  readonly dialogRef = inject(MatDialogRef<AddBookDialogData>);
  readonly data = inject<AddBookDialogData>(MAT_DIALOG_DATA);
}

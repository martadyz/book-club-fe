import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRatingDialog } from './book-rating-dialog';

describe('BookRatingDialog', () => {
  let component: BookRatingDialog;
  let fixture: ComponentFixture<BookRatingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRatingDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(BookRatingDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

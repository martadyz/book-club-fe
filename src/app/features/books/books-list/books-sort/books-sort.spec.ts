import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSort } from './books-sort';

describe('BooksSort', () => {
  let component: BooksSort;
  let fixture: ComponentFixture<BooksSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksSort],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksSort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

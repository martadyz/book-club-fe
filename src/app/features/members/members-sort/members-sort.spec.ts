import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSort } from './members-sort';

describe('MembersSort', () => {
  let component: MembersSort;
  let fixture: ComponentFixture<MembersSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersSort],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersSort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

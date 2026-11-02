import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MemberSort, MemberSortField, SortDirection } from '../models/member.model';

@Component({
  selector: 'app-members-sort',
  imports: [MatButton],
  templateUrl: './members-sort.html',
  styleUrl: './members-sort.scss',
})
export class MembersSort {
  readonly sort = input.required<MemberSort>();
  readonly sortChange = output<MemberSort>();

  onSortChange(field: MemberSortField, direction: SortDirection) {
    this.sortChange.emit({ field, direction });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { MembersStore } from '../data-access/members.store';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { RatingClassDirective } from '../../../shared/directives/rating-class.directive';
import { MembersSort } from '../members-sort/members-sort';

@Component({
  selector: 'app-members-list',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    RatingClassDirective,
    MembersSort
  ],
  providers: [MembersStore],
  templateUrl: './members-list.html',
  styleUrl: './members-list.scss',
})
export class MembersListComponent implements OnInit {
    readonly membersStore = inject(MembersStore);
    readonly panelOpenState = signal(false);

    ngOnInit(): void {
      this.membersStore.loadMembers();
    }
}

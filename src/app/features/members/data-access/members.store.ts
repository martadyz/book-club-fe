import { inject, signal } from "@angular/core";
import { Member } from "../models/member.model";
import { MembersApi } from "./members.api";

export class MembersStore { 
     private readonly api = inject(MembersApi);

  private readonly _members = signal<Member[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly members = this._members.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadMembers(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getMembers().subscribe({
      next: (members: Member[]) => {
        this._members.set(members);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Could not load members');
        this._loading.set(false);
      }
    });
  }
}
import { inject, signal } from "@angular/core";
import { Member, MemberSort } from "../models/member.model";
import { MembersApi } from "./members.api"; 
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { tap, switchMap, catchError, of } from "rxjs";

export const defaultSort: MemberSort = {
  field: 'name',
  direction: 'asc'
}
export class MembersStore { 
  private readonly api = inject(MembersApi);
  private readonly _members = signal<Member[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _sort = signal<MemberSort>(defaultSort);

  readonly members = this._members.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly sort = this._sort.asReadonly();

  constructor() {
      toObservable(this._sort)
        .pipe(
          tap(() => {
            this._loading.set(true);
            this._error.set(null);
          }),
          switchMap(sort =>
            this.api.getMembers(sort).pipe(
              catchError(() => {
                this._error.set('Nie udało się pobrać członków');
                return of([]);
              })
            )
          ),
          takeUntilDestroyed()
        )
        .subscribe(members => {
          this._members.set(members);
          this._loading.set(false);
        });
    }
    
    setSort(sort: MemberSort): void {
      this._sort.set(sort);
    }

  loadMembers(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getMembers(this._sort()).subscribe({
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
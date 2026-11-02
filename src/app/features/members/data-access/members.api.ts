import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"; 
import { environment } from "../../../environments/environment";
import { Member, MemberSort } from "../models/member.model";
import { shareReplay } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MembersApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/members`;

  getMembers(sort: MemberSort) {
    return this.http.get<Member[]>(`${this.apiUrl}?sort=${sort.field},${sort.direction}`).pipe(shareReplay());
  }

}
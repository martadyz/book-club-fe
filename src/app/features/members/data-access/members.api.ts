import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core"; 
import { environment } from "../../../environments/environment.production";
import { Member } from "../models/member.model";

@Injectable({
  providedIn: 'root'
})
export class MembersApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/members`;

  getMembers() {
    return this.http.get<Member[]>(this.apiUrl);
  }

}
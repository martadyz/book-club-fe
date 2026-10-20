import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.production";
import { CurrentUser } from "./auth.store";
import { delay, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  login(name: string, password: string) {
    return this.http.post(
      `${environment.apiUrl}/auth/login`,
      { name, password },
      {
        withCredentials: true
      }
    );
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(
      `${this.apiUrl}/auth/me`,
      {
        withCredentials: true
      }
    )
  }

  logout() {
    return this.http.post(
      `${environment.apiUrl}/auth/logout`,
      {},
      {
        withCredentials: true
      }
    );
  }
}
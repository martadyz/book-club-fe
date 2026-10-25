import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  public authStore = inject(AuthStore);
  logout(): void {
    this.authStore.logout();
  }
}

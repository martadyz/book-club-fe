import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../../core/auth/auth.store';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  public authStore = inject(AuthStore);
  logout(): void {
    this.authStore.logout();
  }
}

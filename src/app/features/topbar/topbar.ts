import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Logout } from '../auth/logout/logout';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-topbar',
  imports: [Logout, RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  readonly authStore = inject(AuthStore);
  readonly router = inject(Router);
}

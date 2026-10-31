import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationStore } from './core/navigation/navigation.store';
import { AuthStore } from './core/auth/auth.store';
import { Logout } from './features/auth/logout/logout';
import { Topbar } from './features/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Logout, Topbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly navigationStore = inject(NavigationStore);
  protected readonly authStore = inject(AuthStore);
}

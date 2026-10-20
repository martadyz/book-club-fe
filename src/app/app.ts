import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationStore } from './core/navigation/navigation.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly navigationStore =
    inject(NavigationStore);
}

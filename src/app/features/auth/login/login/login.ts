import { Component, effect, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '../../../../core/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormField, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private _usernameModel = signal('');
  private _passwordModel = signal('');
  public authStore = inject(AuthStore);
  private readonly router = inject(Router);
  
  constructor() {
    effect(() => {
      if (this.authStore.isAuthenticated()) {
        this.router.navigate(['/books']);
      }
    });
  }

  protected usernameForm = form(this._usernameModel, schemaPath => {
    (required(schemaPath));
  });

  protected passwordForm = form(this._passwordModel, schemaPath => {
    (required(schemaPath));
  });

  protected login(): void {
    if (
      this.usernameForm().invalid() ||
      this.passwordForm().invalid()
    ) {
      return;
    }

    this.authStore.login(
      this._usernameModel(),
      this._passwordModel()
    );
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  recoveryMethod: 'email' | 'mobile' = 'email';

  verificationCode = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;
  submitted = false;

  onSubmit(): void {
    this.submitted = true;

    const validCode = /^\d{6}$/.test(this.verificationCode);
    const validPassword = this.password.length >= 8;
    const passwordsMatch = this.password === this.confirmPassword;

    if (!validCode || !validPassword || !passwordsMatch) {
      return;
    }

    // TODO: Send the code and new password to the backend.
    // The backend must verify the recovery code before changing the password.
    console.log('Reset password form validated.');
  }

  readonly currentYear = new Date().getFullYear();
}

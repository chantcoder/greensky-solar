import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginIdentifier = '';
  password = '';
  showPassword = false;
  isSubmitting = false;

  readonly currentYear = new Date().getFullYear();

  showLoginError = false;

  onSubmit(): void {
    const identifier = this.loginIdentifier.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    const isEmail = emailPattern.test(identifier);
    const isMobile = mobilePattern.test(identifier);

    if ((!isEmail && !isMobile) || !this.password) {
      this.showLoginError = false;

      // Re-trigger the animation even on repeated clicks.
      requestAnimationFrame(() => {
        this.showLoginError = true;
      });

      return;
    }

    this.showLoginError = false;

    // Real backend authentication will be connected later.
    console.log('Login submitted:', {
      identifier,
      loginType: isEmail ? 'email' : 'mobile',
    });
  }




}

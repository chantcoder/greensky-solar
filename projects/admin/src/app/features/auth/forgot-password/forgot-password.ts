
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
 
recoveryMethod: 'email' | 'mobile' = 'email';

email = '';
mobile = '';
submitted = false;

onSubmit(): void {
  this.submitted = true;

  if (this.recoveryMethod === 'email') {
    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());

    if (!validEmail) {
      return;
    }

    console.log('Email recovery requested.');
  } else {
    const validMobile = /^[6-9]\d{9}$/.test(this.mobile.trim());

    if (!validMobile) {
      return;
    }

    console.log('Mobile recovery requested.');
  }

  // Connect the backend recovery API here.
}

    readonly currentYear = new Date().getFullYear();

}

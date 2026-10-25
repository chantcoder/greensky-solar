
  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-register',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './register.html',
    styleUrl: './register.css',
  })
  export class Register {
    fullName = '';
    email = '';
    mobile = '';
    password = '';
    confirmPassword = '';
    showPassword = false;
    showConfirmPassword = false;
    submitted = false;

    onSubmit(): void {
      this.submitted = true;

      if (
        !this.fullName.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) ||
        !/^[6-9]\d{9}$/.test(this.mobile) ||
        this.password.length < 8 ||
        this.password !== this.confirmPassword
      ) {
        return;
      }

      // UI validation only. Connect to the backend before enabling real registration.
      console.log('Registration form validated.');
    }
  }

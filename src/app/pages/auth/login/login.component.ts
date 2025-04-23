import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {

    let data = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authService.login(data.email, data.password).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // Handle successful login here, e.g., redirect to home page
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed', err);
        // Handle error here, e.g., show an error message to the user
        if (err.status === 401) {
          console.error('Invalid credentials');
        } else {
          console.error('An unexpected error occurred', err);
        }
      }
    });
  }

  forgotPassword() {
    // Implement your forgot password logic here
    console.log('Forgot password button clicked');
  }

  register() {
    // Implement your register logic here
    console.log('Register button clicked');
  }

}

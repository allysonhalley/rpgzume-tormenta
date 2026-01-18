import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    error = '';
    isRegistering = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            username: [''] // Only for registration
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        const { email, password, username } = this.loginForm.value;

        if (this.isRegistering) {
            if (!username) {
                this.error = 'Username is required for registration';
                return;
            }
            this.authService.register({ username, email, password }).subscribe({
                next: () => {
                    this.isRegistering = false;
                    this.error = 'Registration successful! Please login.';
                    this.loginForm.patchValue({ password: '' });
                },
                error: err => {
                    console.error('Registration error details:', err);
                    let errorMessage = 'Registration failed';
                    if (typeof err.error === 'string') {
                        errorMessage = err.error;
                    } else if (err.error && typeof err.error === 'object') {
                        // Check for 'message' (common) or 'error' (Spring Default)
                        errorMessage = err.error.message || err.error.error || JSON.stringify(err.error);
                    }
                    this.error = errorMessage;
                }
            });
        } else {
            this.authService.login({ email, password }).subscribe({
                next: () => {
                    this.router.navigate(['/cards']);
                },
                error: err => {
                    console.error('Login error details:', err);
                    let errorMessage = 'Invalid credentials';
                    if (typeof err.error === 'string') {
                        errorMessage = err.error;
                    } else if (err.error && typeof err.error === 'object') {
                        errorMessage = err.error.message || err.error.error || 'Invalid credentials';
                    }
                    this.error = errorMessage;
                }
            });
        }
    }

    loginWithGoogle() {
        // Implement Google Login integration
        console.log('Login with Google clicked');
        // For now, redirect to backend google auth endpoint directly?
        // window.location.href = 'http://localhost:8081/oauth2/authorization/google';
        alert("Google Login not fully configured yet (Backend needs Client ID/Secret)");
    }

    toggleMode() {
        this.isRegistering = !this.isRegistering;
        this.error = '';
    }
}

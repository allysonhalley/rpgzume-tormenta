import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenKey = 'auth_token';
    private currentUserSubject = new BehaviorSubject<any>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem(this.tokenKey);
            if (token) {
                this.currentUserSubject.next({ token });
            }
        }
    }

    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.accessToken && isPlatformBrowser(this.platformId)) {
                    localStorage.setItem(this.tokenKey, response.accessToken);
                    this.currentUserSubject.next({ token: response.accessToken });
                }
            })
        );
    }

    register(user: { username: string, email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.tokenKey);
        }
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getUserId(): number | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return decoded.id || null;
        } catch (e) {
            console.error('Error decoding token', e);
            return null;
        }
    }
}

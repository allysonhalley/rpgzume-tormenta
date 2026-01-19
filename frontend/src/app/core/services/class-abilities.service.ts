import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClassAbilities } from '../models/models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ClassAbilitiesService {
    private apiUrl = '/api/class-abilities';

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getAllClassAbilities(): Observable<any> {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('auth_token');
            const headers = { 'Authorization': `Bearer ${token}` };
            return this.http.get<ClassAbilities[]>(this.apiUrl, { headers });
        }
        return of([]);
    }
}

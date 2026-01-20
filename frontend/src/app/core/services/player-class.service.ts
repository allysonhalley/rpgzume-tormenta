import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PlayerClass } from '../models/models';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlayerClassService {
    private apiUrl = `${environment.apiUrl}/player-classes`;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getAllPlayerClasses(): Observable<any> {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('auth_token');
            const headers = { 'Authorization': `Bearer ${token}` };
            return this.http.get<PlayerClass[]>(this.apiUrl, { headers });
        }
        return of([]);
    }
}

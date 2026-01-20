import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RacialTraits } from '../models/models';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RacialTraitsService {
    private apiUrl = `${environment.apiUrl}/racial-traits`;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getAllRacialTraits(): Observable<any> {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('auth_token');
            const headers = { 'Authorization': `Bearer ${token}` };
            return this.http.get<RacialTraits[]>(this.apiUrl, { headers });
        }
        return of([]);
    }
}

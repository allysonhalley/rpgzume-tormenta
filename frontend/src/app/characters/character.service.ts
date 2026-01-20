
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../core/models/models';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private apiUrl = `${environment.apiUrl}/characters`;

    constructor(private http: HttpClient) { }

    getAllCharacters(): Observable<Character[]> {
        return this.http.get<Character[]>(this.apiUrl);
    }

    getCharactersByUser(userId: number): Observable<Character[]> {
        return this.http.get<Character[]>(`${this.apiUrl}/user/${userId}`);
    }

    getCharacterById(id: string): Observable<Character> {
        return this.http.get<Character>(`${this.apiUrl}/${id}`);
    }

    createCharacter(character: Character): Observable<Character> {
        return this.http.post<Character>(this.apiUrl, character);
    }

    deleteCharacter(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateCharacter(id: string, character: Character): Observable<Character> {
        return this.http.put<Character>(`${this.apiUrl}/${id}`, character);
    }
}

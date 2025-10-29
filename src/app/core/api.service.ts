import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private base = 'https://rickandmortyapi.com/api';

    constructor(private http: HttpClient) { }

    getCharacters(page = 1, name?: string): Observable<any> {
        let params = new HttpParams().set('page', page.toString());
        if (name) params = params.set('name', name);
        return this.http.get(`${this.base}/character`, { params });
    }

    getCharacterById(id: number): Observable<any> {
        return this.http.get(`${this.base}/character/${id}`);
    }
    getLocations(page = 1, name?: string): Observable<any> {
        let params = new HttpParams().set('page', page.toString());
        if (name) params = params.set('name', name);
        return this.http.get(`${this.base}/location`, { params });
    }

    getEpisodes(page = 1, name?: string): Observable<any> {
        let params = new HttpParams().set('page', page.toString());
        if (name) params = params.set('name', name);
        return this.http.get(`${this.base}/episode`, { params });
    }
}

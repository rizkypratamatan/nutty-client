import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private base_url = 'http://localhost:8000/';

    constructor(private http: HttpClient) {}

    public getAllUser(): Observable<any> {
        return this.http.post(this.base_url + 'api/get-all-user', null);
    }

    public getAllGroup(): Observable<any> {
        return this.http.post(this.base_url + 'api/get-user-group', null);
    }

    public getAllRole(): Observable<any> {
        return this.http.post(this.base_url + 'api/get-all-role', null);
    }
}

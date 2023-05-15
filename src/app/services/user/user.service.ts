import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private base_url = 'http://localhost:8000/';

    constructor(private http: HttpClient) {}

    getAllUser() {
        return this.http.post(this.base_url+'api/get-all-user', null);
    }
}

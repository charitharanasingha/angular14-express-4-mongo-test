// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Make a request to your authentication API endpoint
    // Example: return this.http.post('/api/login', { username, password });
    console.log(email);
    return this.http.post(`${baseUrl}/login`, { email, password });
  }

  logout() {
    // Perform logout actions
  }
}



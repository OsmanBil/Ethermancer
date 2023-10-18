import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  // Füge weitere Methoden hinzu, wenn benötigt (z.B. updateUser, deleteUser)

  loginUser(userData: {username: string, password: string}): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/login`, userData);
  }
  
}

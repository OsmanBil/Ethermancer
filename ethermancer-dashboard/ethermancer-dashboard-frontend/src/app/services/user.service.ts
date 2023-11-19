import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private BASE_URL = 'http://localhost:3000';
  // private BASE_URL = 'http://aws-testumgebung-env.eba-szbqhywe.us-east-1.elasticbeanstalk.com';

   backendURL = 'http://aws-testumgebung-env.eba-szbqhywe.us-east-1.elasticbeanstalk.com';

  constructor(private http: HttpClient) { }

  testMainRoute(): Observable<string> {
    return this.http.get<string>(this.backendURL);
  }

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

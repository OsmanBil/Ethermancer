import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Überprüft, ob der Benutzer eingeloggt ist
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }
}

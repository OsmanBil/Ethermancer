import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  user: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Überprüft, ob der Benutzer eingeloggt ist
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  logout() {
    localStorage.removeItem('jwtToken'); // oder den Namen, den Sie für das Token verwendet haben
    this.router.navigate(['/login']); // leitet den Benutzer zur Login-Seite weiter
  }

  getLoggedInUserName(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwt_decode<DecodedToken>(token);
      const username = decodedToken.user.username.toUpperCase();
      return username;
    }
    return null;
  }

  getLoggedInUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwt_decode<DecodedToken>(token);
      const userId = decodedToken.user.id;
      return userId;
    }
    return null;
  }

  getLoggedInName(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwt_decode<DecodedToken>(token);
      const name =
        decodedToken.user.firstname + ' ' + decodedToken.user.lastname;
      return name;
    }
    return null;
  }
}

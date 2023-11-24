import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Pfad zum AuthService anpassen

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Wenn der Benutzer nicht eingeloggt ist, zur Login-Seite weiterleiten
    this.router.navigate(['/login']); // Angenommen, Sie haben eine Route für den Login
    return false;
  }
}

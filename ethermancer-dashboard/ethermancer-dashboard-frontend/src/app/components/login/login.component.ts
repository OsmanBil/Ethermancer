import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    // Überprüfen Sie beim Laden der Komponente, ob der Benutzer bereits eingeloggt ist.
    if (this.authService.isLoggedIn()) {
      // Wenn der Benutzer eingeloggt ist, leiten Sie ihn zum Dashboard weiter.
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(response => {
      localStorage.setItem('jwtToken', response);
      console.log('Token saved:', response);
      this.router.navigate(['/dashboard']); // Redirection to the dashboard after successful registration
    }, error => {
      console.error('Login failed:', error);
    });
  }
}

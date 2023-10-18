import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(response => {
      localStorage.setItem('jwtToken', response);
      console.log('Token saved:', response);
      this.router.navigate(['/product-list']); // Weiterleitung zum Home-Bereich nach erfolgreicher Anmeldung
    }, error => {
      console.error('Login failed:', error);
      // Hier können Sie zusätzliche Aktionen ausführen, z.B. eine Fehlermeldung anzeigen
    });
  }
}

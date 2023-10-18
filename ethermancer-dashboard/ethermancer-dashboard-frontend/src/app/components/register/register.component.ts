import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importieren Sie Router
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {firstName: '', lastName: '', username: '', password: ''};

  constructor(private userService: UserService, private router: Router) { } // Injizieren Sie den Router

  onRegister() {
    this.userService.registerUser(this.user).subscribe(response => {
      localStorage.setItem('jwtToken', response);
      console.log('Token saved:', response);
      this.router.navigate(['/home']); // Weiterleitung zum Home-Bereich oder einer anderen Seite
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importieren Sie Router
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: User = { firstName: '', lastName: '', username: '', password: '' };

  loginData = {
    username: '',
    password: '',
  };

  // Form variables
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  // Form validation variables
  userNameLength: number = 0;
  firstNameLength: number = 0;
  lastNameLength: number = 0;
  emailLength: number = 0;
  emailValid: boolean = false;
  datenschutzAccepted: boolean = false;
  passwordLength: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  onRegister() {
    // console.log('User being sent:', this.user);
    this.userService.registerUser(this.user).subscribe((response) => {
      localStorage.setItem('jwtToken', response);
      // console.log('Token saved:', response);
      this.router.navigate(['/dashboard']); // Redirect to the home area or another page
    });
  }

  openTermsDialog(): void {
    this.dialog.open(TermsComponent, {
      width: '500px',
    });
  }

  onLogin() {}

  // Handle Form Changes
  handleuserNameChange(newValue: string): void {
    this.userNameLength = newValue.length;
  }
  handleFirstNameChange(newValue: string): void {
    this.firstNameLength = newValue.length;
  }
  handleLastNameChange(newValue: string): void {
    this.lastNameLength = newValue.length;
  }
  handlePasswordChange(newValue: string): void {
    this.passwordLength = newValue.length;
  }
  handleEmailChange(newValue: string): void {
    this.emailLength = newValue.length;
    // Check for a valid email format
    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      newValue,
    );
  }
  handleDatenschutzChange(newValue: boolean): void {
    this.datenschutzAccepted = newValue;
  }
}

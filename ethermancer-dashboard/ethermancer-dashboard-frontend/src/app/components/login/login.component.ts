import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  // Form variables
  userName: string = '';
  lastName: string = '';
  email: string = '';

  // Form validation variables
  userNameLength: number = 0;
  lastNameLength: number = 0;
  emailLength: number = 0;
  emailValid: boolean = false;
  datenschutzAccepted: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
  ) {}
  dbTestStatus: string | null = null;
  backendMessage: string = '';

  ngOnInit(): void {
    this.userService.testMainRoute().subscribe(
      (response) => {
        this.backendMessage = response;
      },
      (error) => {
        console.error('Error fetching backend message:', error);
      },
    );

   // When loading the component, check if the user is already logged in.
    if (this.authService.isLoggedIn()) {
      // If the user is logged in, redirect to the dashboard.
      this.router.navigate(['/dashboard']);
    }
  }
  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('jwtToken', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login fehlgeschlagen:', error);
      },
    );
  }

  // Handle Form Changes
  handleuserNameChange(newValue: string): void {
    this.userNameLength = newValue.length;
  }
  handleLastNameChange(newValue: string): void {
    this.userNameLength = newValue.length;
  }
  handleEmailChange(newValue: string): void {
    this.emailLength = newValue.length;
    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      newValue,
    );
  }
  handleDatenschutzChange(newValue: boolean): void {
    this.datenschutzAccepted = newValue;
  }

  submitForm() {}
}

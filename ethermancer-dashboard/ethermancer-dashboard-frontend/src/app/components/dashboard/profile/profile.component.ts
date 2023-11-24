import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(public authService: AuthService) {}

  username = this.authService.getLoggedInUserName();
  name = this.authService.getLoggedInName();
}

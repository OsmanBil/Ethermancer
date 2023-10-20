import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})



export class DashboardHeaderComponent {
  faUser = faUser; // FontAwesome Profil-Icon



  constructor(public authService: AuthService) { }


  username = this.authService.getLoggedInUserName();


}

import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
  faSignOutAlt,
  faArrowRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() isNavExpanded: boolean | undefined;

  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faContactBook = faContactBook;
  faHand = faHand;
  faSignOutAlt = faSignOutAlt;
  faArrowRight = faArrowRight;
  faUser = faUser;

  constructor(private authService: AuthService) {} // oder wie auch immer Ihr Service heißt

  logout() {
    this.authService.logout();
  }
}

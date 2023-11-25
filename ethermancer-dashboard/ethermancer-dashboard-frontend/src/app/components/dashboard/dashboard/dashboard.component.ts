import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  isArrowVisible = false;
  isNavExpanded = true; // standardmäßig auf '

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // console.log('Navigation successful!');
      } else if (event instanceof NavigationError) {
        // console.error(`Navigation error: ${event.error}`);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth((event.target as Window).innerWidth);
  }

  ngOnInit() {
    this.checkScreenWidth(window.innerWidth);
  }

  checkScreenWidth(width: number) {
    if (width < 500) {
      this.isArrowVisible = true;
      this.isNavExpanded = false; // The menu will be hidden if the width is less than 500 pixels
    } else {
      this.isArrowVisible = false;
      this.isNavExpanded = true; // The menu is displayed when the width is greater than or equal to 500 pixels
    }
  }

  toggleNav() {
    this.isNavExpanded = !this.isNavExpanded; // Toggles the menu on or off
  }

  getArrowPosition(): string {
    return this.isNavExpanded ? '100px' : '0px';
  }
}

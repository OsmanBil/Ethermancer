import { Component, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isMenuOpen: { [key: string]: boolean } = {
    about: false,
    products: false,
    investors: false,
    more: false,
  };
  public shouldApplyTransparentBg: boolean = false;
  private clickListener?: () => void;
  public isMainMenuOpen: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private angulartics2: Angulartics2
  ) { }

  ngOnInit(): void {
    // Add listeners for clicks on the entire document
    this.renderer.listen('document', 'click', (event) => {
      // Check if the click event comes from one of the dropdown elements
      if (!event.target.closest('.nav-item')) {
        // Closes all menus when clicked outside
        this.closeAllMenus();
      }
    });
  }

  trackClickEvent(category: string, label: string): void {
    this.angulartics2.eventTrack.next({
      action: 'MenuLinkClicked',
      properties: {
        category: category,
        label: label
      }
    });
  }

  toggleMainMenu(): void {
    this.isMainMenuOpen = !this.isMainMenuOpen;
  }

  removeFocus(event: Event): void {
    this.renderer.selectRootElement(event.target).blur();
  }

  ngOnDestroy(): void {
    // Check if clickListener is defined before calling it
    if (this.clickListener) {
      this.clickListener(); // Removes the event listener
    }
  }

  toggleMenu(menu: string): void {
    if (this.isMenuOpen[menu]) {
      this.closeAllMenus();
    } else {
      this.closeAllMenus(); // closes all other menus
      this.isMenuOpen[menu] = true; // opens the selected menu
    }
  }

  closeAllMenus() {
    Object.keys(this.isMenuOpen).forEach((menu: string) => {
      this.isMenuOpen[menu] = false;
    });
  }

  linkClicked(menu: string): void {
    this.isMenuOpen[menu] = false;
  }

  scrollToElement(elementId: string): void {
    const element: HTMLElement | null = this.document.getElementById(elementId);
    const headerOffset = 60; // Change this number to reflect the actual height of your header
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.shouldApplyTransparentBg = window.pageYOffset > 100;
  }
}

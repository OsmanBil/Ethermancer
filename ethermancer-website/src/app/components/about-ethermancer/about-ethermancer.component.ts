import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-about-ethermancer',
  templateUrl: './about-ethermancer.component.html',
  styleUrls: ['./about-ethermancer.component.scss'],
})
export class AboutEthermancerComponent {
  isLoading: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollToElement(elementId: string): void {
    const element = this.document.getElementById(elementId);
    const headerOffset = 60;

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    } else {
      console.warn(`Element with id ${elementId} not found.`);
    }
  }
}

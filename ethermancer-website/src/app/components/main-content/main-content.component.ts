import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main-content', // oder der Selector Ihrer Komponente
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, OnDestroy {
  // For parallax scrolling
  parallaxListener?: () => void;

  // For hashchange event
  hashChangeListener?: () => void;

  ngOnInit(): void {
    const adjustScrollForNavbar = (hash: string): void => {
      const section: HTMLElement | null = document.getElementById(hash);
      if (section) {
        const navbarHeight: number = 55;
        const sectionTop: number = section.offsetTop;
        const offsetTop: number = sectionTop - navbarHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      } else {
        console.warn(`Element with hash ${hash} not found.`);
      }
    };

    // Add event listener for 'hashchange' event
    this.hashChangeListener = (): void => {
      const hash: string = window.location.hash.substring(1);
      if (hash) {
        adjustScrollForNavbar(hash);
      } else {
        console.warn('Hash is empty or not available.');
      }
    };
    window.addEventListener('hashchange', this.hashChangeListener);

    // Link-Event-Listener
    const navLinks: NodeListOf<Element> =
      document.querySelectorAll('.navbar-link');
    navLinks.forEach((link: Element) => {
      link.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const href: string | null = link.getAttribute('href');
        if (href) {
          const newHash: string = href.substring(1);
          window.history.pushState(null, 'unused', `#${newHash}`);
          adjustScrollForNavbar(newHash);
        } else {
          console.warn('Href attribute is missing.');
        }
      });
    });

    // Parallax scrolling effects code
    const parallaxElements: NodeListOf<Element> = document.querySelectorAll(
      '.parallax-container',
    );
    this.parallaxListener = (): void => {
      parallaxElements.forEach((parallaxContainer: Element) => {
        const parallaxDiv: Element | null =
          parallaxContainer.querySelector('.parallax');
        const scrollTop: number =
          window.pageYOffset || document.documentElement.scrollTop;
        const parallaxOffset: number =
          (scrollTop - (parallaxContainer as HTMLElement).offsetTop) * 0.4;

        if (parallaxDiv) {
          (
            parallaxDiv as HTMLElement
          ).style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        } else {
          console.warn('Parallax div not found.');
        }
      });
    };
    window.addEventListener('scroll', this.parallaxListener);
  }

  ngOnDestroy(): void {
    if (this.parallaxListener) {
      window.removeEventListener('scroll', this.parallaxListener);
    }
    if (this.hashChangeListener) {
      window.removeEventListener('hashchange', this.hashChangeListener);
    }
  }
}

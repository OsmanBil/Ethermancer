import { Component } from '@angular/core';
import { AgreementService } from './services/agreement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ethermancer-website';

  constructor(private agreementService: AgreementService) {
  
  }

  shouldDisplayTermsConfirmation() {
    return !this.agreementService.isTermsConfirmed();
  }
}

import { Component } from '@angular/core';
import { AgreementService } from '../../services/agreement.service';


@Component({
  selector: 'app-terms-confirmation',
  templateUrl: './terms-confirmation.component.html',
  styleUrls: ['./terms-confirmation.component.scss']
})
export class TermsConfirmationComponent {

  constructor(private agreementService: AgreementService) {}

  agreeTerms() {
    this.agreementService.confirmTerms();
  }

}

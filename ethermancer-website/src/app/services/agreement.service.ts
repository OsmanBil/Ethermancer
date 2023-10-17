import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgreementService {
  private termsConfirmed = localStorage.getItem('termsConfirmed') === 'true';

  confirmTerms() {
    this.termsConfirmed = true;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // Set expiration date to 30 days in the future
    localStorage.setItem('termsConfirmed', 'true');
    localStorage.setItem('termsExpiration', expirationDate.toISOString());
  }
  
  isTermsConfirmed() {
    const expirationDate = localStorage.getItem('termsExpiration');
    if (!expirationDate) {
      return false;
    }
    return new Date() < new Date(expirationDate);
  }
  
}

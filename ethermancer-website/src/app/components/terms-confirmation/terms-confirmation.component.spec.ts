import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConfirmationComponent } from './terms-confirmation.component';

describe('TermsConfirmationComponent', () => {
  let component: TermsConfirmationComponent;
  let fixture: ComponentFixture<TermsConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConfirmationComponent]
    });
    fixture = TestBed.createComponent(TermsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

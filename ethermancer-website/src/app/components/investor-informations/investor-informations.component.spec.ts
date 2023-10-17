import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorInformationsComponent } from './investor-informations.component';

describe('InvestorInformationsComponent', () => {
  let component: InvestorInformationsComponent;
  let fixture: ComponentFixture<InvestorInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorInformationsComponent],
    });
    fixture = TestBed.createComponent(InvestorInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

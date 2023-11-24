import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsConfirmationComponent } from './terms-confirmation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TermsConfirmationComponent', () => {
  let component: TermsConfirmationComponent;
  let fixture: ComponentFixture<TermsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsConfirmationComponent],
      imports: [RouterTestingModule] // Import RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(TermsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

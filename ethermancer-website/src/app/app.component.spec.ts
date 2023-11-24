import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { Angulartics2, RouterlessTracking } from 'angulartics2';
import { FooterComponent } from './components/footer/footer.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TermsConfirmationComponent } from './components/terms-confirmation/terms-confirmation.component';

class MockRouterlessTracking {

}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SubscribeComponent,
        TermsConfirmationComponent
      ],
      providers: [
        { provide: Angulartics2, useValue: { startTracking: () => { } } }, // Mock Angulartics2
        { provide: RouterlessTracking, useClass: MockRouterlessTracking } // Verwenden Sie MockRouterlessTracking hier
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ethermancer-website'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ethermancer-website');
  });
});

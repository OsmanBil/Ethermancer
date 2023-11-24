import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutEthermancerComponent } from '../about-ethermancer/about-ethermancer.component';
import { MainContentComponent } from './main-content.component';
import { SystemsComponent } from '../systems/systems.component';
import { KeyFeaturesComponent } from '../key-features/key-features.component';
import { WhyUsComponent } from '../why-us/why-us.component';
import { WalkthroughComponent } from '../walkthrough/walkthrough.component';
import { InvestorInformationsComponent } from '../investor-informations/investor-informations.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { RoadmapComponent } from '../roadmap/roadmap.component';
import { TeamComponent } from '../team/team.component';
import { WhitepaperComponent } from '../whitepaper/whitepaper.component';
import { FaqComponent } from '../faq/faq.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDBBootstrapModule.forRoot()],
      declarations: [
        MainContentComponent,
        AboutEthermancerComponent,
        SystemsComponent,
        KeyFeaturesComponent,
        WhyUsComponent,
        WalkthroughComponent,
        InvestorInformationsComponent,
        TestimonialsComponent,
        RoadmapComponent,
        TeamComponent,
        WhitepaperComponent,
        FaqComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

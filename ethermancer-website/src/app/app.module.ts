import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { AboutEthermancerComponent } from './components/about-ethermancer/about-ethermancer.component';
import { KeyFeaturesComponent } from './components/key-features/key-features.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { SystemsComponent } from './components/systems/systems.component';
import { WalkthroughComponent } from './components/walkthrough/walkthrough.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { TeamComponent } from './components/team/team.component';
import { InvestorInformationsComponent } from './components/investor-informations/investor-informations.component';
import { FaqComponent } from './components/faq/faq.component';
import { WhitepaperComponent } from './components/whitepaper/whitepaper.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { TermsComponent } from './components/terms/terms.component';
import { WhitepaperDokumentComponent } from './components/whitepaper-dokument/whitepaper-dokument.component';
import { ToEthermancerComponent } from './components/to-ethermancer/to-ethermancer.component';
import { TermsConfirmationComponent } from './components/terms-confirmation/terms-confirmation.component';
import { Angulartics2Module } from 'angulartics2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    AboutEthermancerComponent,
    KeyFeaturesComponent,
    WhyUsComponent,
    SystemsComponent,
    WalkthroughComponent,
    RoadmapComponent,
    TestimonialsComponent,
    TeamComponent,
    InvestorInformationsComponent,
    FaqComponent,
    WhitepaperComponent,
    SubscribeComponent,
    ImprintComponent,
    TermsComponent,
    WhitepaperDokumentComponent,
    ToEthermancerComponent,
    TermsConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    Angulartics2Module.forRoot(),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

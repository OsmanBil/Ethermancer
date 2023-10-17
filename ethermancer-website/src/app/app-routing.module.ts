import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { TermsComponent } from './components/terms/terms.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { ToEthermancerComponent } from './components/to-ethermancer/to-ethermancer.component';
import { WhitepaperDokumentComponent } from './components/whitepaper-dokument/whitepaper-dokument.component';

const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'to-ethermancer', component: ToEthermancerComponent },
  { path: 'whitepaper-document', component: WhitepaperDokumentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

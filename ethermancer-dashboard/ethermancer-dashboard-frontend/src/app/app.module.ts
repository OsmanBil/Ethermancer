import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ProductComponent } from './components/product/product.component';
import { CartService } from './services/cart.service';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SideNavComponent } from './components/dashboard/side-nav/side-nav.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { TopWidgetsComponent } from './components/dashboard/top-widgets/top-widgets.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { BotsComponent } from './components/dashboard/bots/bots.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { ChartModule } from 'angular-highcharts';
import { TermsComponent } from './components/dashboard/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    OrderConfirmationComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailsComponent,
    SideNavComponent,
    MainComponent,
    TopWidgetsComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    ProfileComponent,
    SettingsComponent,
    StatisticsComponent,
    BotsComponent,
    MainDashboardComponent,
    ShopComponent,
    TermsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ChartModule
  ],
  providers: [CartService, DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

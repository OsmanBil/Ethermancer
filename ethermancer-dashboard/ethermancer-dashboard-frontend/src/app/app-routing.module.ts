import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { AuthGuard } from './guards/auth.guard'; // Pfad zum AuthGuard anpassen
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { BotsComponent } from './components/dashboard/bots/bots.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { TermsComponent } from './components/dashboard/terms/terms.component';

const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'mainDashboard', pathMatch: 'full' },
  { path: 'mainDashboard', component: MainDashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'bots', component: BotsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'terms', component: TermsComponent },
];


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Leitet Benutzer standardmäßig zur Login-Seite um
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: dashboardRoutes },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'product-details', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

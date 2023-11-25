import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faShoppingCart = faShoppingCart;

  totalQuantity: number = 0;
  constructor(private cartService: CartService) {
    this.cartService.getCartUpdatedListener().subscribe(() => {
      this.updateTotalQuantity();
    });
  }

  updateTotalQuantity(): void {
    this.totalQuantity = this.cartService.getTotalQuantity();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() product: Product;
  @Output() productAdded = new EventEmitter<Product>();

  selectedQuantity: number = 1;

  constructor(private cartService: CartService) {
    this.product = new Product();
  }

  addToCart(): void {
    try {
      this.cartService.addToCart(this.product, +this.selectedQuantity);
    } catch (error) {
      console.error('Error in addToCart:', error);
    }
    this.productAdded.emit(this.product);
  }
}

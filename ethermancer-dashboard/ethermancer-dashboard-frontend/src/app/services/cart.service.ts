import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUpdated = new Subject<void>();
  private cart: CartItem[] = [];

  constructor() {}

  addToCart(product: Product, quantity: number): void {
    const cartItem = this.cart.find((item) => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.cart.push({ product: product, quantity: quantity });
    }
    this.cartUpdated.next();
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
    this.cartUpdated.next();
  }

  removeFromCart(product: Product): void {
    const index = this.cart.findIndex((item) => item.product.id === product.id);

    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.cartUpdated.next();
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartUpdatedListener() {
    return this.cartUpdated.asObservable();
  }
}

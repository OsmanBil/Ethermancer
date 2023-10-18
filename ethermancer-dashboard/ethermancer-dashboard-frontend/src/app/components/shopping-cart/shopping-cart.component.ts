import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  title: string = 'Shopping Cart';
  body: string = 'box';
  fullName: string = '';
  address: string = '';
  creditCardNum: string = '';
  nameLength: number = 0;
  addressLength: number = 0;
  lastFourDigits: string = '';

  constructor(
    private cartService: CartService,
    private decimalPipe: DecimalPipe,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  getTotalAmount(): number {
    const total: number = this.cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    return +total.toFixed(2);
  }

  submitForm(): void {
    const orderData = new Order();
    orderData.totalAmount = this.getTotalAmount();
    orderData.fullName = this.fullName;
    orderData.address = this.address;
    orderData.creditCardNum = this.creditCardNum;

    this.orderService.setOrderData(orderData);
    this.router.navigate(['/order-confirmation']);
    this.cartService.clearCart();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCart();
    alert(
      `The product "${product.name}" has been removed from the shopping cart.`,
    );
  }

  handleNameChange(newValue: string) {
    this.nameLength = newValue.length;
  }

  handleAddressChange(newValue: string) {
    this.addressLength = newValue.length;
  }

  handleCreditCardChange(newValue: string) {
    if (newValue.length >= 4) {
      this.lastFourDigits = newValue.slice(-4);
    } else {
      this.lastFourDigits = '';
    }
  }
}

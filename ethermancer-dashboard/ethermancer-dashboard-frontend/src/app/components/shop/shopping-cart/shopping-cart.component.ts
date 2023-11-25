import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
// import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from 'src/app/models/product';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
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

  public showToast: boolean = false;
  removedProductName: string = '';
  toastClass: string = 'hidden';

  constructor(
    private cartService: CartService,
    private decimalPipe: DecimalPipe,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    //console.log('ShoppingCartComponent loaded');
  }

  getTotalAmount(): number {
    const total: number = this.cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    return +total.toFixed(2);
  }

  submitForm(): void {
    // Query the user ID from the AuthService
    const userId = this.authService.getLoggedInUserId();
    console.error('User ID is:', userId);
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    if (!this.orderService) {
      console.error('OrderService is not available.');
      return;
    }

    this.orderService.placeOrder().subscribe(
      (response) => {
        console.log('Order created:', response);
        const orderId = response.id; // The ID of the created order.
        console.log('Erzeugte Order ID:', orderId);
        if (orderId) {
          // Add each product from the shopping cart to the order.
          for (const item of this.cartItems) {
            this.orderService
              .addProductToOrder(orderId, item.product.id, item.quantity)
              .subscribe(
                (response) => {
                  console.log('Product added to order:', response);
                },
                (error) => {
                  console.error('Error adding product to order:', error);
                },
              );
          }
        } else {
          console.error('Order ID fehlt in der Backend-Antwort.');
        }

        // After all products are added, navigate to the confirmation page.
        this.router.navigate(['/dashboard/shop/order-confirmation']);
        this.cartService.clearCart(); // Empty the shopping cart after the order is completed.
      },
      (error) => {
        console.error('Error creating order:', error);
      },
    );
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCart();
    this.removedProductName = product.name;
    this.toastClass = 'fadeIn'; // Start Fade-In-Animation

    setTimeout(() => {
      this.toastClass = 'fadeOut'; // Start Fade-Out-Animation
    }, 3000);
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

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

  constructor(
    private cartService: CartService,
    private decimalPipe: DecimalPipe,
    private orderService: OrderService,
    private router: Router,
  ) { }

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
    // Erstellen Sie zuerst die Bestellung
    this.orderService.placeOrder().subscribe(
      (response) => {
        // console.log('Order created:', response);
        const orderId = response.id; // Die ID der erstellten Bestellung.
        // console.log("Erzeugte Order ID:", orderId);
        if (orderId) {
          // Nun fügen Sie jedes Produkt aus dem Warenkorb zur Bestellung hinzu.
          for (let item of this.cartItems) {
            this.orderService.addProductToOrder(orderId, item.product.id, item.quantity).subscribe(
              (response) => {
               // console.log('Product added to order:', response);
              },
              (error) => {
               // console.error('Error adding product to order:', error);
              }
            );
          }
        } else {
         // console.error('Order ID fehlt in der Backend-Antwort.');
        }




        // Nachdem alle Produkte hinzugefügt wurden, navigieren Sie zur Bestätigungsseite.
        this.router.navigate(['/dashboard/shop/order-confirmation']);
        this.cartService.clearCart(); // Leeren Sie den Warenkorb, nachdem die Bestellung abgeschlossen ist.
      },
      (error) => {
       // console.error('Error creating order:', error);
      }
    );
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

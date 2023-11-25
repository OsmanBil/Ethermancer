import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private baseUrl: string = 'http://localhost:3000/orders';

  private baseUrl: string =
    'http://ethermancer-dashboard-env.eba-7mhmes8r.us-east-1.elasticbeanstalk.com/orders';

  private orderData: Order | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  placeOrder() {
    const userId = this.authService.getLoggedInUserId();
    console.log('User ID is:', userId);

    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
    };

    // The order data sent to the backend.
    const orderData = {
      user_id: userId,
      status: 'active',
    };

    return this.http.post<Order>(this.baseUrl, orderData, { headers });
  }

  // Method to add a product to an order.
  addProductToOrder(orderId: number, productId: number, quantity: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
    };

    // The product data sent to the backend.
    const productData = {
      productId: productId,
      quantity: quantity,
    };

    // The URL must contain the order ID to which the product is added.
    const url = `${this.baseUrl}/${orderId}/products`;

    return this.http.post(url, productData, { headers });
  }

  setOrderData(data: Order): void {
    this.orderData = data;
  }

  getOrderData(): Order | null {
    return this.orderData;
  }
}

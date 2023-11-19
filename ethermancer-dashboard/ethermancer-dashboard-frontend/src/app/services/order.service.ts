import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private baseUrl: string = 'http://localhost:3000/orders';

  private baseUrl: string = 'http://aws-testumgebung-env.eba-szbqhywe.us-east-1.elasticbeanstalk.com/orders';


  private orderData: Order | null = null;

  constructor(private http: HttpClient, private authService: AuthService) { }

  placeOrder() {

    const userId = this.authService.getLoggedInUserId();
    console.log('User ID is:', userId);

    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
      // Andere benötigte Header...
    };

    // Hier senden wir nur den Status, da das Backend so eingerichtet ist.
    const orderData = {
      user_id: userId,
      status: 'active'
    };

    return this.http.post<Order>(this.baseUrl, orderData, { headers });
  }


  // Methode, um ein Produkt zu einer Bestellung hinzuzufügen.
  addProductToOrder(orderId: number, productId: number, quantity: number) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
      // Andere benötigte Header...
    };

    // Die Produktdaten, die an das Backend gesendet werden.
    const productData = {
      productId: productId,
      quantity: quantity
    };

    // Die URL muss die Bestell-ID enthalten, zu der das Produkt hinzugefügt wird.
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

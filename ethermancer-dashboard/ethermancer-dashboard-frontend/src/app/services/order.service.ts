import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderData: Order | null = null;

  constructor() {}

  setOrderData(data: Order): void {
    this.orderData = data;
  }

  getOrderData(): Order | null {
    return this.orderData;
  }
}

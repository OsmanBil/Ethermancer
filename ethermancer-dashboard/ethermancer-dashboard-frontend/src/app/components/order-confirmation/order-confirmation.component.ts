import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent {
  orderData: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderData = this.orderService.getOrderData();
  }
}

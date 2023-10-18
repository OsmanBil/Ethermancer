import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: Product;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
    this.product = new Product();
  }

  ngOnInit(): void {
    this.loadData();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(this.product, +this.selectedQuantity);
    alert(`The product "${product.name}" has been added to the shopping cart.`);
  }

  async loadData(): Promise<void> {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    try {
      const response: Response = await fetch('./assets/data.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const products: Product[] = await response.json();
      this.product = products.find((product: Product) => product.id === id)!;
    } catch (error: unknown) {
      console.error('There was a problem:', error);
    }
  }
}

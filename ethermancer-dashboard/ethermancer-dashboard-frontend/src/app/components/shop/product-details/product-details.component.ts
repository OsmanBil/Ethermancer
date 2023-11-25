import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: Product;
  selectedQuantity: number = 1;
  products: Product[] = [];

  private BASE_URL: string =
    'http://aws-testumgebung-env.eba-szbqhywe.us-east-1.elasticbeanstalk.com'; // Backend-Server URL (local)

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient
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

  // async loadData(): Promise<void> {
  //   const id: number = +this.route.snapshot.paramMap.get('id')!;
  //   try {
  //     const response: Response = await fetch('./assets/data.json');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const products: Product[] = await response.json();
  //     this.product = products.find((product: Product) => product.id === id)!;
  //   } catch (error: unknown) {
  //     // console.error('There was a problem:', error);
  //   }
  // }

  async loadData(): Promise<void> {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.http.get<Product[]>(`${this.BASE_URL}/products`).subscribe(
      (jsonData: Product[]) => {
        this.products = jsonData;
        // console.log('Fetched products:', this.products); // Log the fetched products
        this.product = this.products.find((product: Product) => product.id === id)!;
      },
      (error: unknown) => {
        console.error('Failed to fetch the product data:', error);
      },
    );
  }
}


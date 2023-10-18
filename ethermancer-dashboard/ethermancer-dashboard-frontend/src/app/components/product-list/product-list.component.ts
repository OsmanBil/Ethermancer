import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Products';
  products: Product[] = [];

  // Backend-Server URL
  // private BASE_URL: string = 'http://testumgebung-env.eba-6jy5svvu.us-east-1.elasticbeanstalk.com';
  private BASE_URL: string = 'http://localhost:3000'; // Backend-Server URL (local)

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(`${this.BASE_URL}/products`).subscribe(
      (jsonData: Product[]) => {
        this.products = jsonData;
      },
      (error: unknown) => {
        console.error('Failed to fetch the product data:', error);
      },
    );
  }

  onProductAdded(product: Product): void {
    alert(`The product "${product.name}" has been added to the shopping cart.`);
  }
}

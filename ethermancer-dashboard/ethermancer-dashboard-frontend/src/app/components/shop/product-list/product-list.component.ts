import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Products';
  products: Product[] = [];
  public showToast: boolean = false;
  addedProductName: string = '';
  toastClass: string = 'hidden';

  // Backend-Server URL
  // private BASE_URL: string = 'http://testumgebung-env.eba-6jy5svvu.us-east-1.elasticbeanstalk.com';
  private BASE_URL: string =
    'http://aws-testumgebung-env.eba-szbqhywe.us-east-1.elasticbeanstalk.com'; // Backend-Server URL (local)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // console.log('ngOnInit called');
    this.http.get<Product[]>(`${this.BASE_URL}/products`).subscribe(
      (jsonData: Product[]) => {
        this.products = jsonData;
        // console.log('Fetched products:', this.products); // Log the fetched products
      },
      (error: unknown) => {
        console.error('Failed to fetch the product data:', error);
      },
    );
  }

  onProductAdded(product: Product): void {
    this.addedProductName = product.name;
    this.toastClass = 'fadeIn'; // Start Fade-In-Animation
  
    setTimeout(() => {
      this.toastClass = 'fadeOut'; // Start Fade-Out-Animation
    }, 3000);
  }
  
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [
      { id: 1, name: 'Computer', price: 650 },
      { id: 2, name: 'Printer', price: 120 },
      { id: 3, name: 'Smartphone', price: 300 },
    ];
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  deleteProduct(idToDelete: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != idToDelete);
    return of(true);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [
      { id: 1, name: 'Computer', price: 650, promotion: true },
      { id: 2, name: 'Printer', price: 120, promotion: false },
      { id: 3, name: 'Smartphone', price: 300, promotion: true },
    ];
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  deleteProduct(idToDelete: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != idToDelete);
    return of(true);
  }

  setPromotion(idToSet: number): Observable<boolean> {
    let produit = this.products.find((p) => p.id == idToSet);

    if (produit) {
      produit.promotion = !produit.promotion;
      return of(true);
    } else return throwError(() => new Error('Produit non trouvé!'));
  }
}

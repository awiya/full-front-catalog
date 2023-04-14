import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProducts, Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];

  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'Computer', price: 650, promotion: true },
      { id: UUID.UUID(), name: 'Printer', price: 120, promotion: false },
      { id: UUID.UUID(), name: 'Smartphone', price: 300, promotion: true },
      { id: UUID.UUID(), name: 'xphone', price: 1000, promotion: true },
    ];

    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: UUID.UUID(),
        name: 'Computer',
        price: 650,
        promotion: true,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'Printer',
        price: 120,
        promotion: false,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'xSmartphone',
        price: 300,
        promotion: true,
      });
    }
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getPageProducts(page: number, size: number): Observable<PageProducts> {
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size != 0) totalPages++;
    let pageProducts = this.products.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    });
  }

  deleteProduct(idToDelete: string): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != idToDelete);
    return of(true);
  }

  setPromotion(idToSet: string): Observable<boolean> {
    let produit = this.products.find((p) => p.id == idToSet);

    if (produit) {
      produit.promotion = !produit.promotion;
      return of(true);
    } else return throwError(() => new Error('Produit non trouvé!'));
  }

  searchProducts(
    key: string,
    page: number,
    size: number
  ): Observable<PageProducts> {
    let filter = this.products.filter((p) => p.name.includes(key));
    let index = page * size;
    let totalPages = ~~(filter.length / size);
    if (filter.length % size != 0) totalPages++;
    let pageProducts = filter.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    });
  }
}

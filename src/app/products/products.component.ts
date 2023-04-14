import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  errorMessage: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer cela?');
    if (conf == false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data) => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number;
  errorMessage: string;
  searchFormGroup: FormGroup;
  action: string = 'all';

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      key: this.formBuilder.control(null),
    });
    this.handleGetPageProducts();
  }

  handleSearchProducts() {
    this.action = 'search';
    this.currentPage = 0;
    let keyword = this.searchFormGroup.value.key;
    this.productService
      .searchProducts(keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
        },
      });
  }

  handleGetPageProducts() {
    this.productService
      .getPageProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          this.errorMessage = err;
        },
      });
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

  handlePromoteProduct(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next: (data) => {
        p.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  goTopage(i: number) {
    this.currentPage = i;
    if (this.action == 'all') this.handleGetPageProducts();
    else this.handleSearchProducts();
  }

  handleNewProduct() {
    this.router.navigateByUrl('/admin/newProduct');
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl('/admin/editProduct/' + product.id);
  }
}

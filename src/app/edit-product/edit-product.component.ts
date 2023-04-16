import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId!: string;
  editProductGroup!: FormGroup;
  errorMessage!: string;
  constructor(
    private fb: FormBuilder,
    private prodService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.prodService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.editProductGroup = this.fb.group({
            id: this.fb.control(data.id),
            name: this.fb.control(data.name),
            price: this.fb.control(data.price),
            promotion: this.fb.control(data.promotion),
          });
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err;
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  newProductFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.newProductFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      price: this.formBuilder.control(0, [Validators.required]),
      promoted: this.formBuilder.control(false),
    });
  }

  handleSaveProduct() {
    let product = this.newProductFormGroup.value;
    this.productService.saveProduct(product).subscribe({
      next: (data) => {
        alert('Le produit a été enregistré avec succès.');
        this.newProductFormGroup.reset();
      },
    });
  }
  getErrorMessage(field: string, error: any): string {
    if (error['required']) {
      return field + ' est requis.';
    } else if (error['minlength']) {
      return (
        field +
        ' doit comporter au moins ' +
        error['minlength']['requiredLength'] +
        ' caractères. '
      );
    } else return '';
  }
}

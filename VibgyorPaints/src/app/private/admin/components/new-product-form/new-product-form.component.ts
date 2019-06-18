import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {

  productForm: FormGroup;
  newid: number;
  product: Product;
  imageSrc;
  loading = false;
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<NewProductFormComponent>,
              private productService: ProductService) {
                if (data.product) {
                  this.loading = true;
                  this.product = data.product;
                  // this.productThemeService.getImage(this.product.imageUrl).then(url => this.imageSrc = url);
                  this.productService.download("021559928779180.jpg").subscribe(image => {
                    this.imageSrc = image;
                  })
                } else {
                  this.imageSrc = './assets/Images/PlaceholderImage150.png';
                }
              }

  ngOnInit() {
    if(this.product) {
      this.productForm = this.fb.group({
        name: [this.product.productName, Validators.required],
        price: [this.product.price, [Validators.required, Validators.pattern('^[0-9]*$')]],
        image: ['', this.product.id === undefined ? Validators.required : null],
        active: [this.product.deleted === undefined ? true : !this.product.deleted]
      });
    } else {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        image: ['', Validators.required],
        active: [true]
      });
    }
  }

  save() {
    const product: Product = {
      id: this.product ? this.product.id : null,
      imageUrl: this.product ? this.product.imageUrl : null,
      deleted: !this.productForm.controls.active.value,
      productName: this.productForm.controls.name.value,
      price: this.productForm.controls.price.value
    };
    const formData = new FormData();
    formData.append("file", this.fileInput.nativeElement.files[0]);
    this.productService.upload(formData).subscribe((res: string) => {
      product.imageUrl = res;
      this.productService.update(product).subscribe(() => {
        this.dialogRef.close(true);
      });
      console.log("filename: " + res);
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
}

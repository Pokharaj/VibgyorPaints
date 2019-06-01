import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductsThemesService } from 'src/app/core/services/products-themes.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent implements OnInit {

  productForm: FormGroup;
  newid: number;
  imageSrc;
  loading = false;
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public product,
              public dialogRef: MatDialogRef<NewProductFormComponent>,
              private productservice: ProductsThemesService) {
                this.newid = product.newid;
                if (product.data) {
                  this.loading = true;
                  this.product = product.data;
                  this.productservice.getImage(product.data.imageURL).then(url => this.imageSrc = url);
                } else {
                  this.imageSrc = './assets/Images/PlaceholderImage150.png';
                }
              }

  ngOnInit() {
      this.productForm = this.fb.group({
        name: [this.product.name, Validators.required],
        price: [this.product.price, [Validators.required, Validators.pattern('^[0-9]*$')]],
        image: ['', this.product.id === undefined ? Validators.required : null],
        active: [this.product.isDeleted === undefined ? true : !this.product.isDeleted]
      });
  }

  save() {
    const product = {
      id: this.product.id === undefined ? this.newid : this.product.id,
      imageURL: this.productForm.controls.image.dirty
                ? 'images/products/' + this.productForm.controls.name.value.replace(/\s/g, '') + '.jpg'
                : this.product.imageURL,
      isDeleted: this.product.id === undefined ? false : !this.productForm.controls.active.value,
      name: this.productForm.controls.name.value,
      price: this.productForm.controls.price.value
    };

    this.productservice.addChanges(product, product.id, this.productForm.controls.image.dirty
                                                        ? this.fileInput.nativeElement.files[0]
                                                        : '').then(() => {
      this.dialogRef.close(true);
    }).catch(err => {
      console.log(err);
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

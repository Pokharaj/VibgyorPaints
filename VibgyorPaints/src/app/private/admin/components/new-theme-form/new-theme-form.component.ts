import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatAutocomplete, MatChipInputEvent } from '@angular/material';
import { ProductsThemesService } from 'src/app/core/services/products-themes.service';
import { Products } from 'src/app/core/models/products';
import { Observable } from 'rxjs';
import { ENTER, COMMA} from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-theme-form',
  templateUrl: './new-theme-form.component.html',
  styleUrls: ['./new-theme-form.component.scss']
})
export class NewThemeFormComponent implements OnInit {

  themeForm: FormGroup;
  newid: number;
  imageSrc;
  loading = false;
  productslist: Observable<Products[]>;
  products: Products[];
  materialCtrl = new FormControl();
  removable = true;

  @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private theme,
              public dialogRef: MatDialogRef<NewThemeFormComponent>,
              private productservice: ProductsThemesService) {
                this.newid = theme.newid;
                this.products = theme.products.filter(product => product.isDeleted === false);
                if (theme.data) {
                  this.loading = true;
                  this.theme = theme.data;
                  this.products = this.products.filter(product => !this.theme.material.includes(product));
                  this.productservice.getImage(theme.data.imageURL).then(url => this.imageSrc = url);
                } else {
                  this.imageSrc = './assets/Images/PlaceholderImage150.png';
                  this.theme.material = [];
                }
                this.productslist = this.materialCtrl.valueChanges.pipe(
                  map((product: any | null) => product ? this._filter(product) : this.products.slice()));
              }

  ngOnInit() {
      this.themeForm = this.fb.group({
        name: [this.theme.name, Validators.required],
        material: [this.theme.material.map(ele => ele), Validators.required],
        image: ['', this.theme.id === undefined ? Validators.required : null ],
        active: [this.theme.isDeleted === undefined ? true : !this.theme.isDeleted]
      });
  }

  save() {
    const theme = {
      id: this.theme.id === undefined ? this.newid : this.theme.id,
      imageURL: this.themeForm.controls.image.dirty
                ? 'images/themes/' + this.themeForm.controls.name.value.replace(/\s/g, '') + '.jpg'
                : this.theme.imageURL,
      isDeleted: this.theme.id === undefined ? false : !this.themeForm.controls.active.value,
      name: this.themeForm.controls.name.value,
      material: this.themeForm.controls.material.value.map(product => product.id)
    };

    this.productservice.addThemeChanges(theme, theme.id, this.themeForm.controls.image.dirty
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

  remove(product: Products) {
    const index = this.themeForm.controls.material.value.indexOf(product);
    if (index >= 0) {
      this.products.push(this.themeForm.controls.material.value[index]);
      this.products.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      this.themeForm.controls.material.value.splice(index, 1);
      this.materialCtrl.updateValueAndValidity();
      this.setRemovable(this.themeForm.controls.material.value.length);
    }
  }

  private _filter(value: any): Products[] {
    if (typeof(value) === 'string') {
      const filterValue = value.toLowerCase();
      return this.products.filter(product => product.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      const filterValue = value.name.toLowerCase();
      return this.products.filter(product => product.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.themeForm.controls.material.value.push(event.option.value);
    this.products.splice(this.products.indexOf(event.option.value), 1);
    this.productInput.nativeElement.value = '';
    this.setRemovable(this.themeForm.controls.material.value.length);
  }

  setRemovable(length: number) {
    this.themeForm.controls.material.markAsDirty();
    this.themeForm.controls.material.setErrors(null);
    if (length === 1) {
      this.removable = false;
    } else {
      this.removable = true;
    }
  }
}

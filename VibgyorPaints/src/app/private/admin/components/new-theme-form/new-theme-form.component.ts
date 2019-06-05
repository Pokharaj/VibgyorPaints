import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Theme } from 'src/app/core/models/theme';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-new-theme-form',
  templateUrl: './new-theme-form.component.html',
  styleUrls: ['./new-theme-form.component.scss']
})
export class NewThemeFormComponent implements OnInit {

  themeForm: FormGroup;
  imageSrc;
  loading = false;
  theme: Theme;
  productslist: Observable<Product[]>;
  products: Product[];
  materialCtrl = new FormControl();
  removable = true;

  @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('fileInput') fileInput;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data,
              private dialogRef: MatDialogRef<NewThemeFormComponent>,
              private themeService: ThemeService) {
    this.products = data.products.filter(product => product.deleted === false);
    if (data.theme) {
      this.loading = true;
      this.theme = data.theme;
      this.products = this.theme.materials;
      // this.productThemeService.getImage(this.theme.imageUrl).then(url => this.imageSrc = url);
    } else {
      this.imageSrc = './assets/Images/PlaceholderImage150.png';
      this.theme = {
        id: null,
        themeName: '',
        imageUrl: '',
        deleted: false,
        materials: []
      }
    }
    this.productslist = this.materialCtrl.valueChanges.pipe(
      map((product: Product | null) => product ? this.filter(product) : this.products.slice()));
  }

  ngOnInit() {
    if(this.theme) {
      this.themeForm = this.fb.group({
        name: [this.theme.themeName, Validators.required],
        material: [this.theme.materials.map(ele => ele), Validators.required],
        image: [''],
        active: !this.theme.deleted
      });
    } else {
      this.themeForm = this.fb.group({
        name: ['', Validators.required],
        material: [null, Validators.required],
        image: ['', Validators.required],
        active: true
      });
    }
  }

  save() {
    const theme: Theme = {
      id: this.theme ? this.theme.id : null,
      imageUrl: this.themeForm.controls.image.dirty
                ? 'images/themes/' + this.themeForm.controls.name.value.replace(/\s/g, '') + '.jpg'
                : this.theme.imageUrl,
      deleted: this.theme ? !this.themeForm.controls.active.value : false,
      themeName: this.themeForm.controls.name.value,
      materials: this.themeForm.controls.material.value.map(product => product)
    };

    // this.productThemeService.saveImage(theme.imageUrl, this.themeForm.controls.image.dirty
    //   ? this.fileInput.nativeElement.files[0] : '');
    this.themeService.create(theme).subscribe(() => {
      this.dialogRef.close(true);
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

  remove(product: Product) {
    const index = this.themeForm.controls.material.value.indexOf(product);
    if (index >= 0) {
      this.products.push(this.themeForm.controls.material.value[index]);
      this.products.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      this.themeForm.controls.material.value.splice(index, 1);
      this.materialCtrl.updateValueAndValidity();
      this.setRemovable(this.themeForm.controls.material.value.length);
    }
  }

  private filter(value: any): Product[] {
    if (typeof(value) === 'string') {
      const filterValue = value.toLowerCase();
      return this.products.filter(product => product.productName.toLowerCase().indexOf(filterValue) === 0);
    } else {
      const filterValue = value.productName.toLowerCase();
      return this.products.filter(product => product.productName.toLowerCase().indexOf(filterValue) === 0);
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

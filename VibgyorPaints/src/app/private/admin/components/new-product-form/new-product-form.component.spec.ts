import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductFormComponent } from './new-product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('NewProductFormComponent', () => {
  let component: NewProductFormComponent;
  let fixture: ComponentFixture<NewProductFormComponent>;
  let SubmitButton: HTMLInputElement;
  let mockProductService;
  const product = {
    checked: false,
    id: 0,
    imageURL: 'images/products/red.jpg',
    isDeleted: false,
    key: '0',
    name: 'Vibgyor Aspira Red',
    price: '50',
    quantity: -1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [
        NewProductFormComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form valid/invalid with popUp data', () => {
    expect(component.productForm.valid).toBeFalsy();
    component.product = product;
    component.ngOnInit();
    expect(component.productForm.valid).toBeTruthy();
  });

  it('submit button is enabled when form is valid and dirty', () => {
    SubmitButton = fixture.debugElement.query(By.css('.submit')).nativeElement;
    expect(SubmitButton.disabled).toBe(true);
    component.product = product;
    component.ngOnInit();
    expect(SubmitButton.disabled).toBe(true);
    component.productForm.markAsDirty();
    fixture.detectChanges();
    expect(SubmitButton.disabled).toBe(false);
  });

  it('addChanges of product-theme service should get', () => {
    mockProductService = jasmine.createSpyObj(['addChanges']);
    // component = new NewProductFormComponent(mockProductService, )
    // component.ngOnInit();
    SubmitButton = fixture.debugElement.query(By.css('.submit')).nativeElement;
    SubmitButton.click();
    expect(mockProductService).toHaveBeenCalled();
  });

});

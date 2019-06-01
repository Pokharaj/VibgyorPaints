import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

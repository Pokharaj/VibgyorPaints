import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ThemesComponent } from './components/themes/themes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImagePopUpComponent } from './components/image-pop-up/image-pop-up.component';
import { EstimatesDialogComponent } from './components/estimates-dialog/estimates-dialog.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/reducers/prouct.reducer';

@NgModule({
  declarations: [
    ProductComponent,
    ThemesComponent,
    ImagePopUpComponent,
    EstimatesDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('product', productReducer),
  ],
  entryComponents: [
    EstimatesDialogComponent
  ]
})
export class ProductsModule { }

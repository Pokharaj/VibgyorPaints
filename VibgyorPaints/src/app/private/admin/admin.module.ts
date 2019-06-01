import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UserRequestDetailsComponent } from './components/user-request-details/user-request-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoresComponent } from './components/stores/stores.component';
import { StoreFormComponent } from './components/store-form/store-form.component';
import { ProductsComponent } from './components/products/products.component';
import { NewProductFormComponent } from './components/new-product-form/new-product-form.component';
import { NewThemeFormComponent } from './components/new-theme-form/new-theme-form.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserRequestDetailsComponent,
    StoreFormComponent,
    StoresComponent,
    ProductsComponent,
    NewProductFormComponent,
    NewThemeFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    UserRequestDetailsComponent,
    StoreFormComponent,
    NewProductFormComponent,
    NewThemeFormComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ThemesComponent } from './components/themes/themes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', component: ProductComponent },
      { path: 'themes', component: ThemesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

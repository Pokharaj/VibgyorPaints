import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { StoresComponent } from './components/stores/stores.component';
import { VisitsComponent } from 'src/app/shared/components/visits/visits.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', component: UsersComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'products&themes', component: ProductsComponent},
      { path: 'visits', component: VisitsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

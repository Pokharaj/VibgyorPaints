import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/components/home/home.component';
import { StoresComponent } from './public/components/stores/stores.component';
import { AdminAuthGuard } from './core/guard/admin-auth.guard';
import { VisitsComponent } from './shared/components/visits/visits.component';
import { AuthGuard } from './core/guard/auth.guard';
import { FeedbackComponent } from './public/components/feedback/feedback.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'feedback', component: FeedbackComponent },
  {
    path: 'purchase',
    loadChildren: './public/products/products.module#ProductsModule'
  },
  { path: 'stores', component: StoresComponent },
  {
    path: 'admin',
    canLoad: [AdminAuthGuard],
    loadChildren: './private/admin/admin.module#AdminModule'
  },
  {
    path: 'visits',
    component: VisitsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

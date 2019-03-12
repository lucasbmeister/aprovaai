import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {PurchaseRequestModule} from './pages/purchase-request/purchase-request.module';

const routes: Routes = [
  { path: '', redirectTo: 'login-form', pathMatch: 'full' },
  { path: 'purchase-request', loadChildren: './pages/purchase-request/purchase-request.module#PurchaseRequestModule' },
  { path: 'purchase-request-detail/:requestNum', loadChildren: './pages/purchase-request-detail/purchase-request-detail.module#PurchaseRequestDetailModule' },
  { path: 'login-form', loadChildren: './pages/login-form/login-form.module#LoginFormPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {PendingPurchaseModule} from './pages/pending-purchase/pending-purchase.module';

const routes: Routes = [
  { path: '', redirectTo: 'login-form', pathMatch: 'full' },
  { path: 'pending-purchase', loadChildren: './pages/pending-purchase/pending-purchase.module#PendingPurchaseModule' },
  { path: 'purchase-request-detail/:requestNum', loadChildren: './pages/purchase-request-detail/purchase-request-detail.module#PurchaseRequestDetailModule' },
  { path: 'login-form', loadChildren: './pages/login-form/login-form.module#LoginFormPageModule' },
  { path: 'purchase-order-detail/:orderNum', loadChildren: './pages/purchase-order-detail/purchase-order-detail.module#PurchaseOrderDetailPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

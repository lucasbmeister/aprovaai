import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrderDetailPage } from './purchase-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseOrderDetailPage]
})
export class PurchaseOrderDetailPageModule {}

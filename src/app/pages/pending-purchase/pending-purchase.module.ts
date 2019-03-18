import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PendingPurchasePage } from './pending-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: PendingPurchasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PendingPurchasePage]
})
export class PendingPurchaseModule {}

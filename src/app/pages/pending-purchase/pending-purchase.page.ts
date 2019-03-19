import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseRequestService } from '../../providers/purchase-request.service';
import {PurchaseOrderService} from '../../providers/purchase-order.service';
import { LoadingController, NavController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { PurchaseRequest } from 'src/app/models/purchaseRequest.model';
import { LoadingControllerService } from 'src/app/providers/loading-controller.service';

@Component({
  selector: 'app-pending-purchase',
  templateUrl: './pending-purchase.page.html',
  styleUrls: ['./pending-purchase.page.scss'],
})
export class PendingPurchasePage implements OnInit, OnDestroy{

  requests : PurchaseRequest[] = [];
  orders : Array<any>;
  subscriptions : Array<Subscription> = [];

  constructor(private PurchaseReqService: PurchaseRequestService, 
              private PurchaseOrdService : PurchaseOrderService ,
              private loadingController : LoadingController, 
              private router :  Router,
              private loading : LoadingControllerService) {}

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onClickRequestCard(requestNum)
  {
    this.router.navigateByUrl('purchase-request-detail/' + requestNum);
  }

  public onClickOrderCard(orderNum)
  {
    this.router.navigateByUrl('purchase-order-detail/' + orderNum);
  }

  public RequestAndOrderService(): Observable<any[]> {
    let requests = this.PurchaseReqService.GetPurchaseRequest();
    let orders   = this.PurchaseOrdService.GetPurchaseOrder();

    return forkJoin([requests, orders])
  }

  ionViewWillEnter() {
      this.loading.present();

      this.subscriptions.push( this.RequestAndOrderService().subscribe(
      data => {this.requests = data[0]; 
              this.orders = data[1]},
      error => {this.loading.dismiss(); alert(error)},
      () =>
      { 
        this.loading.dismiss();
      }
    ));
  }
}

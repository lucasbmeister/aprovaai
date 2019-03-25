import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from 'src/app/providers/purchase-order.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingControllerService } from 'src/app/providers/loading-controller.service';
import { PurchaseOrder } from 'src/app/models/purchaseOrder.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.page.html',
  styleUrls: ['./purchase-order.page.scss'],
})
export class PurchaseOrderPage implements OnInit {

  orders : PurchaseOrder[] = [];
  pendingOrders  : PurchaseOrder[] = [];
  approvedOrders : PurchaseOrder[] = [];
  rejectedOrders : PurchaseOrder[] = [];
  currentTab       : string = "";

  subscriptions : Array<Subscription> = [];
  selection : boolean = false;
  title : string;

  constructor(private PurchaseOrdService: PurchaseOrderService, 
              private router :  Router,
              private loading : LoadingControllerService) {}

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onClickOrder(order)
  {
    this.PurchaseOrdService.SetCurrentOrder(order);
    this.router.navigateByUrl('purchase-request-detail/' + order.OrderNum);
  }

  ionViewWillEnter() {
      if(this.getCurrentTab() == "")
      {
        this.title = "Pendentes";
        this.currentTab = "pendentes";
      }

      this.pendingOrders.length = 0 ;
      this.approvedOrders.length = 0;
      this.rejectedOrders.length = 0;
      this.loading.present();

      this.subscriptions.push( this.PurchaseOrdService.GetPurchaseOrder().subscribe(
      data => {this.orders = data
        this.orders.forEach(item => {
          if(item.OrderStatus === 'B' ){
            this.pendingOrders.push(item)
          }
          else if(item.OrderStatus === 'L'){
            this.approvedOrders.push(item);
          }
          else if(item.OrderStatus === 'R'){
            this.rejectedOrders.push(item);
          }
        })        
      },
      error => {this.loading.dismiss(); alert(error)},
      () =>
      { 
        this.loading.dismiss();
      }
    ));
  }

  pressEvent(e){
    this.selection = true;
    console.log("pressed")
  }

  deselectAll() {
    this.selection = false;
    this.orders.forEach(ord =>{
      ord.IsChecked = false;
    });
  }

  doNothing(){
    
  }

  setCurrentTab(tab){
    this.currentTab = tab;
  }

  getCurrentTab(){
    return this.currentTab;
  }

  loadMore(){

  }

}

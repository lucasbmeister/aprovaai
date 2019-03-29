import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseRequestService } from '../../providers/purchase-request.service';
//import {PurchaseOrderService} from '../../providers/purchase-order.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Observable, forkJoin, Subscription, empty } from 'rxjs';
import { PurchaseRequest } from 'src/app/models/purchaseRequest.model';
import { LoadingControllerService } from 'src/app/providers/loading-controller.service';
import { HammerGestureConfig } from '@angular/platform-browser';
import { EMPTY_ARRAY } from '@angular/core/src/view';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
})
export class PurchaseRequestPage implements OnInit, OnDestroy{
  
  requests : PurchaseRequest[] = [];
  pendingRequests  : PurchaseRequest[] = [];
  approvedRequests : PurchaseRequest[] = [];
  rejectedRequests : PurchaseRequest[] = [];
  currentTab       : string = "";

  subscriptions : Array<Subscription> = [];
  selection : boolean = false;
  title : string;

  constructor(private PurchaseReqService: PurchaseRequestService, 
              private loadingController : LoadingController, 
              private router :  Router,
              private loading : LoadingControllerService,
              private alertController : AlertController,) {}

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onClickRequest(request)
  {
    this.PurchaseReqService.SetCurrentRequest(request);
    this.router.navigateByUrl('purchase-request-detail/' + request.RequestNum);
  }

  ionViewWillEnter() {
      if(this.getCurrentTab() == "")
      {
        this.title = "Pendentes";
        this.currentTab = "pendentes";
      }

      this.loadData()
  }

  pressEvent(e){
    this.selection = true;
    console.log("pressed")
  }

  deselectAll() {
    this.selection = false;
    this.requests.forEach(req =>{
      req.IsChecked = false;
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

  loadData(){
      this.pendingRequests.length = 0 ;
      this.approvedRequests.length = 0;
      this.rejectedRequests.length = 0;
      this.loading.present();

      this.subscriptions.push( this.PurchaseReqService.GetPurchaseRequest().subscribe(
      data => {this.requests = data
        this.requests.forEach(item => {
          if(item.RequestStatus === 'B' ){
            this.pendingRequests.push(item)
          }
          else if(item.RequestStatus === 'L'){
            this.approvedRequests.push(item);
          }
          else if(item.RequestStatus === 'R'){
            this.rejectedRequests.push(item);
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

  public refuseAll() {
    let marked : PurchaseRequest[] = [];
    this.requests.forEach(req =>{
      if(req.IsChecked){
        req.Decision = "R";
        marked.push(req);
      }
    });
    this.loading.present();
    this.subscriptions.push(this.PurchaseReqService.PutPurchaseRequest("", marked).subscribe(
      () => {
        this.loading.dismiss();
        this.presentAlert('Alerta', 'Items Reprovados', '')
        this.loadData();
      }
    ));
  }
  public approveAll() {
    let marked : PurchaseRequest[] = [];
    this.requests.forEach(req =>{
      if(req.IsChecked){
        req.Decision = "L";
        marked.push(req);
      }
    });
    this.loading.present();
    this.subscriptions.push(this.PurchaseReqService.PutPurchaseRequest("", marked).subscribe(
      () => {
        this.loading.dismiss();
        this.presentAlert('Alerta', 'Items Aprovados', '');
        this.loadData();
      }
    ));
  }

  async presentAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

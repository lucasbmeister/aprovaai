import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , Subscription } from 'rxjs';
import { LoadingController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PurchaseDetail } from 'src/app/models/purchaseDetail.model';
import { forEach } from '@angular/router/src/utils/collection';
import { PurchaseRequestService } from 'src/app/providers/purchase-request.service';
import { map } from 'rxjs/operators';
import { PurchaseRequest } from 'src/app/models/purchaseRequest.model';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.page.html',
  styleUrls: ['./purchase-request-detail.page.scss'],
})
export class PurchaseRequestDetailPage implements OnInit, OnDestroy {

  requestItems : Array<any>;
  loadingElement : any;
  loading : any;
  requestNum : string;
  subscriptions : Array<Subscription> = [];
  currentRequest: PurchaseRequest;

  constructor(private loadingController : LoadingController, 
              private route: ActivatedRoute, 
              private alertController : AlertController,
              private PurchaseRequestService : PurchaseRequestService,
              private router :  Router,) 
  { 
    this.requestNum = this.route.snapshot.paramMap.get('requestNum');
  }

  ngOnInit() {

    this.presentLoading("Carregando items")
    this.currentRequest = this.PurchaseRequestService.GetCurrentRequest();
    
    this.subscriptions.push(this.PurchaseRequestService.GetPurchaseRequestProducts(this.requestNum,"" ,this.currentRequest.Company, this.currentRequest.Branch).subscribe(
        data => this.requestItems = data,
        error => {this.loading.dismiss(); alert(error)},
        () =>
        { 
          this.loading.dismiss();
        }
    ));  
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  async presentLoading(Message) {
    this.loading = await this.loadingController.create({
      message: Message
    }); 
    return await this.loading.present();
  }

  approveMarkedItems() {
    this.executePurchasePut("L");
  }

  refuseMarkedItems() {
    this.executePurchasePut("R");
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

  filterItems() {

    this.requestItems = this.requestItems.filter(function(value, index, arr){
      return !value.IsChecked;
    });

    if(this.requestItems.length <= 0){
        this.router.navigateByUrl("purchase-request")
    }
  }

  executePurchasePut(Decision : string){
    let ArrayMarkedItem : Array<PurchaseDetail> = []

    this.requestItems.forEach(item => {
        if(item.IsChecked)
        {
          item.Decision = Decision;
          ArrayMarkedItem.push(item);
        }
      }
    );

    if(ArrayMarkedItem.length <= 0){
      this.presentAlert('Alerta', 'Selecione pelo menos um item', 'Nenhum item selecionado.')
      return;
    }

    this.presentLoading("Aguarde");

    this.PurchaseRequestService.PutPurchaseRequestProducts(this.requestNum,"",ArrayMarkedItem, this.currentRequest.Company, this.currentRequest.Branch).subscribe(      
      success => {this.presentAlert("Aprovação","","Items " + (Decision === 'L' ? "Aprovados" : "Reprovados")); 
                  this.loading.dismiss();                
                },
      error => {this.loading.dismiss();
               this.presentAlert("Erro","",error)},
      () => {
        this.filterItems();   
      }
    );
  }

  actionButtons(){
    return this.currentRequest.RequestStatus == 'B'
  }

  goBack(){
    this.router.navigateByUrl("purchase-request")
  }
}

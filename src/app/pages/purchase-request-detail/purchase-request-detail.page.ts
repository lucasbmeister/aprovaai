import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , Subscription } from 'rxjs';
import { LoadingController, NavParams, AlertController } from '@ionic/angular';
import { PurchaseRequestDetailService } from 'src/app/providers/purchase-request-detail.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseDetail } from 'src/app/models/purchaseDetail.model';

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

  constructor(private loadingController : LoadingController, 
              private PurchaseReqDetailService : PurchaseRequestDetailService, 
              private route: ActivatedRoute, 
              private alertController : AlertController) 
  { 
    this.requestNum = this.route.snapshot.paramMap.get('requestNum');
  }

  ngOnInit() {

    this.presentLoading()

    this.subscriptions.push(this.PurchaseReqDetailService.GetPurchaseRequestDetail(this.requestNum).subscribe(
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando Itens'
    }); 
    return await this.loading.present();
  }

  approveMarkedItems() {

    let ArrayMarkedItem : Array<PurchaseDetail> = []

    this.requestItems.forEach(item => {
        if(item.IsChecked)
        {
          ArrayMarkedItem.push(item);
        }
      }
    );

    if(ArrayMarkedItem.length <= 0){
      this.presentAlert('Alerta', 'Selecione pelo menos um item', 'Nenhum item selecionado.')
    }
  }

  refuseMarkedItems() {

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

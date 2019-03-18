import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingController, NavParams } from '@ionic/angular';
import { PurchaseOrderDetailService } from 'src/app/providers/purchase-order-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.page.html',
  styleUrls: ['./purchase-order-detail.page.scss'],
})
export class PurchaseOrderDetailPage implements OnInit {

  orderItems : Array<any>;
  loadingElement : any;
  loading : any;
  orderNum : string;
  subscriptions : Array<Subscription> = [];

  constructor(private loadingController : LoadingController, private PurchaseOrdDetailService : PurchaseOrderDetailService, private route: ActivatedRoute) 
  { 
    this.orderNum = this.route.snapshot.paramMap.get('orderNum');
  }

  ngOnInit() {

    this.presentLoading()

    this.subscriptions.push(this.PurchaseOrdDetailService.GetPurchaseOrderDetail(this.orderNum).subscribe(
        data => this.orderItems = data,
        error => {this.loading.dismiss(); alert(error)},
        () =>
        { 
          this.loading.dismiss();
        }
    )) 
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

}

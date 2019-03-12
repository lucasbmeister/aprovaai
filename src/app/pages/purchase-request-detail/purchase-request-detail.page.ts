import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoadingController, NavParams } from '@ionic/angular';
import { PurchaseRequestDetailService } from 'src/app/providers/purchase-request-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-request-detail',
  templateUrl: './purchase-request-detail.page.html',
  styleUrls: ['./purchase-request-detail.page.scss'],
})
export class PurchaseRequestDetailPage implements OnInit {

  requestItems : Array<any>;
  loadingElement : any;
  loading : any;
  requestNum : string;

  constructor(private loadingController : LoadingController, private PurchaseReqDetailService : PurchaseRequestDetailService, private route: ActivatedRoute) 
  { 
    this.requestNum = this.route.snapshot.paramMap.get('requestNum');
  }

  ngOnInit() {

    this.presentLoading()

    this.PurchaseReqDetailService.GetPurchaseRequestDetail(this.requestNum).subscribe(
        data => this.requestItems = data,
        error => {this.loading.dismiss(); alert(error)},
        () =>
        { 
          this.loading.dismiss();
        }
    );  
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando Itens'
    }); 
    return await this.loading.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { PurchaseRequestService } from '../../providers/purchase-request.service';
import { LoadingController, NavController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
})
export class PurchaseRequestPage implements OnInit{

  requests : Array<any>;
  loadingElement : any;
  loading : any;

  constructor(private PurchaseReqService: PurchaseRequestService, private loadingController : LoadingController, private router :  Router) {}

  ngOnInit() {
    this.presentLoading();

    this.PurchaseReqService.GetPurchaseRequest().subscribe(
      data => {this.requests = data;},
      error => {this.loading.dismiss(); alert(error)},
      () =>
      { 
        this.loading.dismiss();
      }
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando Solicitações'
    }); 
    return await this.loading.present();
  }

  public onClickRequestCard(requestNum)
  {
    this.router.navigateByUrl('purchase-request-detail/' + requestNum);
  }
}

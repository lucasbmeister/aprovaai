import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { PurchaseIndicator } from 'src/app/models/indicator.model';
import { PurchaseIndicatorsService } from 'src/app/providers/purchase-indicators.service';
import { LoadingController } from '@ionic/angular';
import { LoggedUser } from 'src/app/models/loggedUser.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('RequestChartCanvas') requestChartCanvas;
  @ViewChild('OrderChartCanvas') orderChartCanvas;
  
  requestChart : any;  
  orderChart : any;
  indicators : PurchaseIndicator[] = [];
  indicatorOrder : Array<number> = [];
  indicatorRequest :Array<number> = [];
  loading : any;

  constructor(private purchaseIndService : PurchaseIndicatorsService,
              private loadingController : LoadingController,
              ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.presentLoading()

    this.purchaseIndService.GetIndicators().subscribe(
      data => {this.indicators = data
          this.indicators.forEach(item => {
          if(item.Type === "PC"){
            this.indicatorOrder = [item.Pending, item.Approved, item.Rejected];
          }
          else if(item.Type === "SC" ){
            this.indicatorRequest = [item.Pending, item.Approved, item.Rejected];
          }
        })
      },
      error => {
        this.loading.dismiss(); 
        alert(error)
      },
      () => 
      {
        console.log(this.indicatorRequest);this.loading.dismiss(); this.buildCharts()
      },
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando indicadores'
    }); 
    return await this.loading.present();
  }

  buildCharts(){
      console.log(this.indicatorRequest)
      this.requestChart = new Chart(this.requestChartCanvas.nativeElement, {
        type: 'doughnut',
        data: { 
            labels: ["Pendentes", "Aprovadas", "Rejeitadas"],
            datasets: [{
                label: '# de Solicitações',
                data: this.indicatorRequest,
                backgroundColor: [
                    'yellow',
                    'lightgreen',
                    'LightCoral'
                ],
                hoverBackgroundColor: [
                    'Gold',
                    'darkgreen',
                    'darkred'
                ]
            }]
        }
      });
    
      this.orderChart = new Chart(this.orderChartCanvas.nativeElement, {
        type: 'doughnut',
        data: {
            labels: ["Pendentes", "Aprovados", "Rejeitados"],
            datasets: [{
                label: '# de Pedidos',
                data: this.indicatorOrder,
                backgroundColor: [
                    'yellow',
                    'lightgreen',
                    'LightCoral'
                ],
                hoverBackgroundColor: [
                    'Gold',
                    'darkgreen',
                    'darkred'
                ]
            }]
        }
      });
  }
}

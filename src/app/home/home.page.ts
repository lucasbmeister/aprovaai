import { Component, OnInit } from '@angular/core';
import { SolicitacaoCompraService } from '../providers/solicitacaocompra.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  sol: Array<any>;
  loadingElement: any;

  constructor(private solCompService: SolicitacaoCompraService, private loadingController: LoadingController) {}

  ngOnInit() {

    this.loadingElement = this.loadingController.create({
        spinner:'crescent'
    });

    this.loadingElement.Present();

    this.solCompService.GetSolicitaoCompra()
                       .subscribe(
                          data => this.sol = data,
                          error => alert("Erro"),
                          this.loadingElement.Dismiss());
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

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

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.requestChart = new Chart(this.requestChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Pendentes", "Aprovadas", "Rejeitadas"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3],
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
              label: '# of Votes',
              data: [5, 10, 15],
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderDetailService {

  constructor(private http: HttpClient) {
  }

  GetPurchaseOrderDetail(OrderNum): Observable<any> {
      return this.http.get(environment.ProtheusUrl + '/rest/purchaseorderdetail/' + OrderNum);
  }
}
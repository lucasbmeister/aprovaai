import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PurchaseDetail, PurchaseDetailAdapter } from '../models/purchaseDetail.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestDetailService {

  constructor(private http: HttpClient, private adapter : PurchaseDetailAdapter) {
  }

  GetPurchaseRequestDetail(RequestNum): Observable<any> {
      return this.http.get(environment.ProtheusUrl + '/rest/purchaserequestdetail/' + RequestNum).pipe(
        map((data: any[]) => data.map(item => this.adapter.adapt(item))),
    );
  }
}
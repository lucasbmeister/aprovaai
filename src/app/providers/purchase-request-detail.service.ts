import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestDetailService {

  constructor(private http: HttpClient) {
  }

  GetPurchaseRequestDetail(RequestNum): Observable<any> {
      return this.http.get('//jvd60103358.jv01.local:8092/rest/purchaserequestdetail/' + RequestNum);
  }
}
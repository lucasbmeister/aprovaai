import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PurchaseOrderService {

    constructor(private http: HttpClient) {
    }

    GetPurchaseOrder(): Observable<any> {
        return this.http.get(environment.ProtheusUrl + '/rest/purchaseorder/');
    }

    PutPurchaseOrder(OrderNum, body): Observable<any> {
        return this.http.put(environment.ProtheusUrl + '/rest/purchaseorder/' + OrderNum, JSON.stringify(body));
    }
}
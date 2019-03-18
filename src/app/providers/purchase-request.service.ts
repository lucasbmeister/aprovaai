import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseRequest, PurchaseRequestAdapter } from '../models/purchaseRequest.model';
import { environment } from '../../environments/environment';


@Injectable()
export class PurchaseRequestService {

    constructor(private http: HttpClient,  private adapter: PurchaseRequestAdapter) {
    }

    GetPurchaseRequest(): Observable<PurchaseRequest[]> {    
        
        return this.http.get(environment.ProtheusUrl + '/rest/purchaserequest/').pipe(
            map((data: any[]) => data.map(item => this.adapter.adapt(item))),
        );
    }
}
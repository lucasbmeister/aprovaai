import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { wrapper } from '../models/wrapper.model';
import { PurchaseRequest, PurchaseRequestAdapter } from '../models/purchaseRequest.model';
import { PurchaseDetailAdapter, PurchaseDetail } from '../models/purchaseDetail.model';


@Injectable()
export class PurchaseRequestService {

    private currentRequest : PurchaseRequest;
    private currentTab : string = "";

    constructor(private http: HttpClient,  
        private adapterRequest: PurchaseRequestAdapter,
        private adapterProducts: PurchaseDetailAdapter,
        ) {

    }

    GetPurchaseRequest(): Observable<PurchaseRequest[]> {    
        return this.http.get(environment.getServerUrl() + '/rest/purchaserequests/').pipe(
            map((data: any[]) => data.map(item => this.adapterRequest.adapt(item))),
        );
    }

    GetPurchaseRequestProducts(RequestNum, Product = "", Company, Branch): Observable<PurchaseDetail[]> { 
        
        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.append('Company', Company).append('Branch', Branch);

        return this.http.get(environment.getServerUrl() + '/rest/purchaserequests/' + RequestNum + '/products/' + Product, {headers : headers}).pipe(
            map((data: any[]) => data.map(item => this.adapterProducts.adapt(item))),
        );
    }

    PutPurchaseRequest(PurchaseNum ="" ,Purchases): Observable<any> { 

        let body;

        if(Purchases instanceof Array)
        {
            body = new wrapper({
                data : Purchases
            });
        }
        else{
            body = Purchases;
        }
        
        return this.http.put(environment.getServerUrl() + '/rest/purchaserequests/' + PurchaseNum, body);
    }

    PutPurchaseRequestProducts(PurchaseNum, ProductNum = "" ,Products): Observable<any> { 
        
        let body;

        if(Products instanceof Array)
        {
            body = new wrapper({
                data : Products
            });
        }       
        return this.http.put(environment.getServerUrl() + '/rest/purchaserequests/' + PurchaseNum + '/products/' + ProductNum, body);
    }

    SetCurrentRequest(request){
        this.currentRequest = request;
    }

    GetCurrentRequest(){
        return this.currentRequest;
    }
}
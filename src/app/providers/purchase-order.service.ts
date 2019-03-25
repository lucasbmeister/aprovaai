import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { wrapper } from '../models/wrapper.model';
import { PurchaseDetailAdapter, PurchaseDetail } from '../models/purchaseDetail.model';
import { PurchaseOrderAdapter, PurchaseOrder } from '../models/purchaseOrder.model';

@Injectable()
export class PurchaseOrderService {

    private currentOrder : PurchaseOrder;

    constructor(private http: HttpClient,
                private adapterProducts : PurchaseDetailAdapter,
                private adapterOrder : PurchaseOrderAdapter) {
    }

    GetPurchaseOrder(): Observable<PurchaseOrder[]> {
        return this.http.get(environment.ProtheusUrl + '/rest/purchaseorders/').pipe(
            map((data: any[]) => data.map(item => this.adapterOrder.adapt(item)))
            );
    }

    GetPurchaseOrderProducts(OrderNum, Product = ""): Observable<PurchaseDetail[]> {
        return this.http.get(environment.ProtheusUrl + '/rest/purchaseorders/' + OrderNum +'/products/' + Product).pipe(
            map((data: any[]) => data.map(item => this.adapterProducts.adapt(item))),
        );
    }

    PutPurchaseOrder(OrderNum, Orders): Observable<any> {
        let body;

        if(Orders instanceof Array)
        {
            body = new wrapper({
                data : Orders
            });
        }
        else
        {
            body = Orders;
        }

        return this.http.put(environment.ProtheusUrl + '/rest/purchaseorders/' + OrderNum, body);
    }

    PutPurchaseOrderProducts(OrderNum, ProductNum = "", Products): Observable<any> {
        let body;

        if(Products instanceof Array)
        {
            body = new wrapper({
                data : Products
            });
        }

        return this.http.put(environment.ProtheusUrl + '/rest/purchaseorders/' + OrderNum + '/products/' + ProductNum, body);
    }

    SetCurrentOrder(order){
        this.currentOrder = order;
    }

    GetCurrentOrder(){
        return this.currentOrder;
    }
}
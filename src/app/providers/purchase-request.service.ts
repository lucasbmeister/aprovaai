import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PurchaseRequest } from '../models/PurchaseRequest';

@Injectable()
export class PurchaseRequestService {

    constructor(private http: HttpClient) {
    }

    GetPurchaseRequest(): Observable<any> {
        return this.http.get('//jvd60103358.jv01.local:8092/rest/purchaserequest/');
    }
}
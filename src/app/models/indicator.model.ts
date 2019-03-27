import { Adapter } from '../adapters/GenericAdapter';
import { Injectable } from '@angular/core';

export class PurchaseIndicator {

    constructor(    
        public Type     : string,
        public Pending  : number,
        public Approved : number,
        public Rejected : number,
        ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PurchaseIndicatorAdapter implements Adapter<PurchaseIndicator> {
    adapt(item: any) : PurchaseIndicator {
        return new PurchaseIndicator(
            item.TYPE,
            parseInt(item.PENDING),
            parseInt(item.APPROVED),
            parseInt(item.REJECTED),
        );
    }
}
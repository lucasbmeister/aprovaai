import { Adapter } from '../adapters/GenericAdapter';
import { Injectable } from '@angular/core';

export class PurchaseOrder {

    constructor(    
        public Company       : string,
        public Branch        : string,  
        public OrderNum      : string,
        public OrderStatus   : string,
        public OrderUser     : string,
        public OrderDate     : string,
        public OrderType     : string,
        public IsChecked     : boolean, 
        public Decision      : string,
        ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PurchaseOrderAdapter implements Adapter<PurchaseOrder> {
    adapt(item: any) : PurchaseOrder {
        return new PurchaseOrder(
            item.COMPANY,
            item.BRANCH,
            item.ORDERNUM,
            item.ORDERSTATUS,
            item.ORDERUSER,
            item.ORDERDATE,
            item.ORDERTYPE,
            false,
            "",
        );
    }
}
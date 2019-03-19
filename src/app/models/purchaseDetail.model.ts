import { Adapter } from '../adapters/GenericAdapter';
import { Injectable } from '@angular/core';

export class PurchaseDetail {

    constructor(    
        public PurchaseNum : string,
        public ProdCod     : string,
        public ProdMu      : string,
        public ProdQty     : string,
        public IsChecked   : boolean, 
        public Decision    : string,
        ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PurchaseDetailAdapter implements Adapter<PurchaseDetail> {
    adapt(item: any) : PurchaseDetail {
        return new PurchaseDetail(
            item.PURCHASENUM,
            item.PRODCOD,
            item.PRODMU,
            item.PRODQTY,
            false,
            ""
        );
    }
}
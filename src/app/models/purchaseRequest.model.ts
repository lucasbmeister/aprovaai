import { Adapter } from '../adapters/GenericAdapter';
import { Injectable } from '@angular/core';

export class PurchaseRequest {

    constructor(  
        public Company       : string,
        public Branch        : string,  
        public RequestNum    : string,
        public RequestStatus : string,
        public RequestUser   : string,
        public RequestDate   : string,
        public IsChecked     : boolean, 
        public Decision      : string,
        ) { }
}

@Injectable({
    providedIn: 'root'
})

export class PurchaseRequestAdapter implements Adapter<PurchaseRequest> {
    adapt(item: any) : PurchaseRequest {
        return new PurchaseRequest(
            item.COMPANY,
            item.BRANCH,
            item.REQUESTNUM,
            item.REQUESTSTATUS,
            item.REQUESTUSER,
            item.REQUESTDATE,
            false,
            "",
        );
    }
}
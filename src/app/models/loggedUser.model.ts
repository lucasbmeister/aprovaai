import { Adapter } from '../adapters/GenericAdapter';
import { Injectable } from '@angular/core';

export class LoggedUser {

    constructor(    
        public Index     : string,
        public UserId    : string,
        public FullName  : string,
        public Email     : string,
        ) { }
}

@Injectable({
    providedIn: 'root'
})

export class LoggedUserAdapter implements Adapter<LoggedUser> {
    adapt(item: any) : LoggedUser {
        return new LoggedUser(
            item.INDEX,
            item.USERID,
            item.FULLNAME,
            item.EMAIL,
        );
    }
}
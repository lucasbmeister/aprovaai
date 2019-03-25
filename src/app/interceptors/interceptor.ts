import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const index = req.url.indexOf('check_security');

        if (index < 0) {

            let headersNewReq = req.headers;
            let token = localStorage.getItem('token');

            const newReq = req.clone({
               headers: headersNewReq.append("Authorization", "Basic " + token)
           });
            return next.handle(newReq); 
        }

        return next.handle(req);            
    }
};
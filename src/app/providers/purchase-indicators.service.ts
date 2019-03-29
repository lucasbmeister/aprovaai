import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseIndicator, PurchaseIndicatorAdapter } from '../models/indicator.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseIndicatorsService {

  constructor(private http: HttpClient,
              private indicatorAdaptater : PurchaseIndicatorAdapter) { }

  GetIndicators() : Observable<PurchaseIndicator[]>{
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Access-Control-Allow-Origin', "*");

    return this.http.get(environment.getServerUrl() + "/rest/indicators", {headers : headers}).pipe(
      map((data : any[]) => data.map(item => this.indicatorAdaptater.adapt(item)))
      );
  }
}

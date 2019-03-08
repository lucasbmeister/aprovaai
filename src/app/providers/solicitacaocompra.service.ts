import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SolicitacaoCompraService {

  constructor(private http: HttpClient) {
  }

  GetSolicitaoCompra(): Observable<any> {
    return this.http.get('//jvd60103358.jv01.local:8092/rest/solicitacaocompra/');
  }
}
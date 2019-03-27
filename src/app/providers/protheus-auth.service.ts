import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtheusAuthService {
  private url_service: string;

  constructor(public http: Http) {
    
  }

  login(usr, pass) {
    return new Promise((resolve, reject) => {    
      this.url_service = environment.ProtheusUrl;

      if(this.url_service != null) {

        let token = btoa(usr+':'+pass);
        let headers = new Headers();

        headers.append("Authorization", "Basic " + token);

        this.http.get(this.url_service + '/rest/check_security', {headers: headers})
        .map(res => res.json())
        .timeout(20000)
        .subscribe(response => {
          localStorage.setItem('token', token);
          resolve({success: true, token: token});
        }, err => {
          console.log(err);
          
          if(err.status == 401) {
            reject("Acesso negado");
          } else if(err.status == 500) {
            reject(err.errorMessage);
          } else if(err.status == 404) {
            reject(err.errorMessage);
          }
        });
      } else {
        reject("Servidor não configurado");
      }
    });
  }

}
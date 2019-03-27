import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { LoggedUserAdapter, LoggedUser } from '../models/loggedUser.model';
import { map } from 'rxjs/internal/operators/map';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtheusUserService {

  constructor(private http : HttpClient,
              private userAdapter : LoggedUserAdapter) { }


  GetLoggedUser() : Observable<any>{
    return this.http.get(environment.ProtheusUrl + "/rest/loggeduser/");
  }
}

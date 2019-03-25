import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { LoggedUserAdapter } from '../models/loggedUser.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProtheusUserService {

  constructor(private http : HttpClient,
              private userAdapter : LoggedUserAdapter) { }


  GetLoggedUser(){
    return this.http.get(environment.ProtheusUrl + "/rest/loggeduser/").pipe(
      map((data: any[]) => data.map(item => this.userAdapter.adapt(item))),
  );
  }
}

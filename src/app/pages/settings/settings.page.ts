import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  serverUrl : string = "";

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.serverUrl = localStorage.getItem('serverUrl')
  }

  saveSettings(){
    if(this.serverUrl != ""){
      localStorage.setItem('serverUrl', this.serverUrl)
      this._location.back();
    }
    else
    {
      alert('Campo não pode estar vazio')
    }
  }
}

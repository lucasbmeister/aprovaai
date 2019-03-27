import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PurchaseRequestPage } from './pages/purchase-request/purchase-request.page';
import { LoggedUser } from './models/loggedUser.model';
import { environment } from 'src/environments/environment.prod';

import { Events } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userFullName : string;
  userEmail : string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private events : Events
  ) {
    this.initializeApp();

    this.events.subscribe('user:loggedin', () => {
      this.userFullName = localStorage.getItem('userFullName');
      this.userEmail = localStorage.getItem('userEmail');
    })

    this.events.subscribe('user:loggedout', () => {
      this.userFullName = "";
      this.userEmail = "";
    })
  }

  logout() {
    this.events.publish('user:loggedout');
    this.router.navigateByUrl('login-form');
    localStorage.setItem('token', '');
    localStorage.setItem('userIndex', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('userEmail', '');
    localStorage.setItem('userFullName', '')
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // (localStorage.getItem('token') != "") ? this.router.navigateByUrl('home') : this.router.navigateByUrl('login-form');
      this.router.navigateByUrl('login-form');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  goToPage(page){
    this.router.navigateByUrl(page)
  }

}

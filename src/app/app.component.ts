import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PendingPurchasePage } from './pages/pending-purchase/pending-purchase.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {
    this.initializeApp();
  }

  logout() {
    this.router.navigateByUrl('login-form');
    localStorage.setItem('token', '');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('login-form');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
}

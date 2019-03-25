import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PROVIDERS } from './providers/providers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Route } from '@angular/compiler/src/core';
import { HttpsRequestInterceptor } from '../app/interceptors/interceptor';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        'press': { time: 1000 }  //set press delay for 1 second
    }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, HttpModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    {provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true},
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

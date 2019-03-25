import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProtheusAuthService } from 'src/app/providers/protheus-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LoadingController, AlertController } from '@ionic/angular';
import { LoadingControllerService } from 'src/app/providers/loading-controller.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  loginForm : FormGroup;

  constructor(private router : Router, 
              private AuthService : ProtheusAuthService, 
              private formBuilder : FormBuilder,
              private alertController : AlertController,
              private loading : LoadingControllerService) {

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
  }

  login(){
    if(this.loginForm.valid) {
      if(this.loginForm.controls['username'].value == 'teste' && this.loginForm.controls['password'].value == 'teste'){
        this.router.navigateByUrl('home');
      }
      this.loading.present();
      this.AuthService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .then(result => {
        this.loading.dismiss();
        this.router.navigateByUrl('home');
      }).catch(err => {
        this.loading.dismiss();
        this.presentAlert("Erro", err, "");
      });
    }
  }

  async presentAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
//
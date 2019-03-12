import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  onClickEntrar(){
    this.router.navigateByUrl('purchase-request');
  }
}

import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Validators, FormBuilder } from "@angular/forms";
import { Firebase } from "../../services/firebase";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loading: boolean = false;
  public msgErrorSignIn: string;
  loginForm = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', Validators.required]
  });

  constructor(public nav: NavController, 
              public forgotCtrl: AlertController, 
              public menu: MenuController, 
              public toastCtrl: ToastController, 
              public firebase: Firebase, 
              private fb: FormBuilder) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm);
      const email = this.loginForm.controls["email"].value;
      const password = this.loginForm.controls["password"].value;
      this.firebase.login(email, password)
      .then((result) => {
        this.loading = false;
        this.nav.setRoot(HomePage);
        console.log(result);
      })
      .catch((error) => {
        this.msgErrorSignIn = error;
        this.loading = false;
        console.error(error);
      });
    }
  }


}

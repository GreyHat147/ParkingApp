import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { Validators, FormBuilder } from "@angular/forms";
import { Firebase } from "../../services/firebase";
import { AngularFireAuth } from '@angular/fire/auth';

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
              private fb: FormBuilder,
              public afAuth: AngularFireAuth) {
    this.menu.swipeEnable(false);
    this.onAuthStateChanged();
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
        this.goToHome();
        console.log(result);
      })
      .catch((error) => {
        this.msgErrorSignIn = error;
        this.loading = false;
        console.error(error);
      });
    }
  }

  onAuthStateChanged() {
    return this.afAuth.auth.onAuthStateChanged((user) => {
        console.log('user', user)
        if (user) {
          // User is signed in.
          this.goToHome();
        }
    });
}

  goToHome() {
    this.nav.setRoot(HomePage);
  }


}

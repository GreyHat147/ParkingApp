import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { Firebase } from "../../services/firebase";
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public loading: boolean = false;
  public msgErrorSignUp: string;
  registerForm = this.fb.group({
    code: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', Validators.required]
  });

  constructor(public nav: NavController, public firebase: Firebase, private fb: FormBuilder) {
  }

  // register and go to home page
  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log(this.registerForm);
      const email = this.registerForm.controls["email"].value;
      const password = this.registerForm.controls["password"].value;
      const code = this.registerForm.controls["code"].value;
      this.firebase.register(email, password)
      .then((result: any) => {
        if (result && result.user) {
          return this.firebase.createUserDb(result.user.uid, { code, email })
        } else {
          this.msgErrorSignUp = "Error creando el usuario";
          this.loading = false;
        }
      })
      .then((response) => {
        console.log(response);
        if (response) {
          this.loading = false;
          this.nav.setRoot(HomePage);
          console.log(response);
        }
      })
      .catch((error) => {
        this.msgErrorSignUp = error;
        this.loading = false;
        console.error(error);
      });
    }
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}

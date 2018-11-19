import {Component} from "@angular/core";
import {App, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { Firebase } from './../../services/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  user: any;
  userForm: FormGroup;
  public loading: boolean = false;
  constructor(public nav: NavController, public firebase: Firebase, public app: App, private fb: FormBuilder) {
    this.setDataForm();
    this.user = firebase.getAuthInfoUser();
    this.firebase.getUserDb(this.user.uid)
    .subscribe((userDb) => {
      console.log(userDb)
      this.userForm.patchValue(userDb);
      console.log('user', this.userForm.value)
    });
  }

  // logout
  logout() {
    this.firebase.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  setDataForm() {
    this.userForm = this.fb.group({
      code: [''],
      name: [''],
      lastname: [''],
      email: [''],
      birthdate: [''],
      sex: ['']
    });
  }

  update() {
    this.loading = true;
    this.firebase.updateUser(this.user.uid, this.userForm.value)
    .then(() => {
      this.loading = false;
      console.log('updated')
    })
    .catch((error) => {
      this.loading = false;
      console.log(error)
    });
    console.log(this.userForm.value)
  }
}

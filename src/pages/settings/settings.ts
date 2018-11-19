import {Component} from "@angular/core";
import {App, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { Firebase } from './../../services/firebase';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController, public firebase: Firebase, public app: App) {
  }

  // logout
  logout() {
    this.firebase.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }
}

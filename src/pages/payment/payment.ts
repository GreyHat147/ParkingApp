import {Component} from "@angular/core";
import {NavController, Platform } from "ionic-angular";

import { Firebase } from './../../services/firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})

export class PaymentPage {

  constructor( public nav: NavController, public plt: Platform, public firebase: Firebase, private storage: Storage) {

  }



}

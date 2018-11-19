import { LoginPage } from './../login/login';
import {Component} from "@angular/core";
import {NavController, Platform } from "ionic-angular";
import {Storage} from '@ionic/storage';

import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  myCount = 0;
  constructor( public nav: NavController, public plt: Platform, private barcodeScanner: BarcodeScanner, private qrScanner: QRScanner) {
  }

  startStay() {
    this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData);
    }).catch(err => {
        console.log('Error', err);
    });
  }

}

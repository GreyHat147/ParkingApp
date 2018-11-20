import {Component} from "@angular/core";
import {NavController, Platform, ToastController} from "ionic-angular";

import { Firebase } from './../../services/firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})

export class PaymentPage {
  public paymethods = 'creditcard';
  isThereStay: boolean = false;
  payment: any = {
    stay: {},
    details_payment: {
      card_holder: null,
      card_number: null,
      month: null,
      year: null, 
      cvv: null
    }
  };
  constructor( public nav: NavController, public plt: Platform, public firebase: Firebase, private storage: Storage, private toastCtrl: ToastController) {
    this.existsStay()
    .then((idStay) => {
      console.log('Estadia en progreso', idStay)
      if (idStay) {
        this.isThereStay = true;
        this.firebase.getStay(idStay)
        .subscribe((stay) => {
          this.payment.stay = stay;
          console.log(this.payment)
        });
      } else {
        this.isThereStay = false;
      }
    });
  }

  ionViewWillEnter() {
    this.existsStay()
    .then((idStay) => {
      console.log('Estadia en progreso', idStay)
      if (idStay) {
        this.isThereStay = true;
        this.firebase.getStay(idStay)
        .subscribe((stay) => {
          this.payment.stay = stay;
          console.log(this.payment)
        });
      } else {
        this.isThereStay = false;
      }
    });
  }

  existsStay() {
    return new Promise((resolve, reject) => {
      this.storage.get('idCurrentStay')
      .then((val) => {
        resolve(val);
      })
      .catch(() => {
        reject(false);
      });
    });
  }

  pay() {
    console.log(this.payment)
    this.firebase.createPayment(this.payment)
    .then((payed) => {
      return (payed) ? this.firebase.updateStay(this.payment.stay.idStay, { payed: true }) : Promise.resolve(true);
    })
    .then((result) => {
        this.showToast("El pago se ha realizado con exito", 3000);
        this.storage.remove('idCurrentStay');
        this.payment = null;
        this.isThereStay = false;
        this.nav.popToRoot();

    })
    .catch(() => {
      this.showToast("Error de servidor", 5000);
    });
  }

  showToast(msg, time) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: 'bottom'
    });
    toast.present();

  }

  deleteStay() {
    this.storage.remove('idCurrentStay');
  }

}



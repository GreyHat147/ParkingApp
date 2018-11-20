import {Component} from "@angular/core";
import {NavController, Platform } from "ionic-angular";

import { Firebase } from './../../services/firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  myCount = 0;
  currentUser;
  stay = {
    idStay: null,
    id_user: null,
    start_date: null,
    end_date: null,
    start: true,
    end: false,
    pay: false,
    rate_applied: null,
    short_start_date: null,
    short_end_date: null
  };
  constructor( public nav: NavController, public plt: Platform, public firebase: Firebase, private barcodeScanner: BarcodeScanner, private storage: Storage) {
    this.currentUser = this.firebase.getAuthInfoUser();
    this.stay.id_user = this.currentUser.uid;
    this.updateStay();
  }

  startStay() {
    let startDate = new Date();
    this.stay.start_date = startDate.getTime();
    this.stay.short_start_date = this.dateToHoursMinutes(startDate);
    this.stay.start = false;
    this.stay.end = true;
    this.stay.pay = false;
    this.stay.rate_applied = 0;
    this.firebase.startStay(this.stay)
    .then((stay: any) => {
      console.log(stay)
      this.storage.set('idCurrentStay', stay.id);
      setTimeout(() => {
        this.updateStay();
      }, 2000);
    })
    .catch((error) => {
      console.log(error)
    });
    /*this.barcodeScanner.scan()
    .then(barcodeData => {

      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }

      this.firebase.startStay()
    }).catch(err => {
        console.log('Error', err);
    });*/
  }

  updateStay() {
    this.existsStay()
    .then((idStay: any) => {
      console.log('idStay', idStay)
      if (idStay) {
        console.log(idStay)
        this.firebase.getStay(idStay)
        .subscribe((stay: any) => {
          this.stay = stay;
          this.stay.idStay = idStay;
          console.log('stay', this.stay)
        });
      }
    })
  }

  endStay() {
    let endDate = new Date();
    console.log('endDate', endDate)
    this.stay.end_date = endDate.getTime();
    this.stay.short_end_date = this.dateToHoursMinutes(endDate);
    console.log('this.stay.short_end_date', this.stay.short_end_date)
    this.stay.start = false;
    this.stay.end = false;
    this.stay.pay = true;
    let start = this.timestampToDate(this.stay.start_date);
    let end = this.timestampToDate(this.stay.end_date);
    this.stay.rate_applied = this.getRate(start, end);
    console.log(this.stay)
    this.firebase.updateStay(this.stay.idStay, this.stay)
    .then(() => {
      console.log('updated')
    })
    .catch((error) => {
      console.log(error)
    });
  }

  payStay() {
   /*  this.nav.push(); */
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

  diff_minutes(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  timestampToDate(unix_timestamp) {
    return new Date(unix_timestamp);
  }

  dateToHoursMinutes(date) {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
  }

  getRate(start, end) {
    let ratePerMinute = 500;
    let minutesInStay = this.diff_minutes(end, start);
    console.log('minutes', minutesInStay)
    return minutesInStay * ratePerMinute;
  }

}

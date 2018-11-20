import {Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})

export class HistoryPage {
  currentUSer: any;
  payments = [];
  constructor(public navCtrl: NavController, public firebase: Firebase) {
    this.currentUSer = this.firebase.getAuthInfoUser();
    this.firebase.getPaymentsByUser(this.currentUSer.uid)
    .subscribe((payments) => {
      this.payments = payments;
    console.log(payments)
    })
    
  }

}


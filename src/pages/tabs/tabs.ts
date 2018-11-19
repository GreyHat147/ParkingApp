
import {Component, ViewChild} from "@angular/core";
import {NavController, PopoverController, Tabs} from "ionic-angular";
import { HomePage } from './../home/home';
import { SettingsPage } from "../settings/settings";
import { HistoryPage } from "../history/history";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1 = HomePage;
  tab2 = HistoryPage;
  tab3 = SettingsPage;
  constructor(public navCtrl: NavController) {
      /* this.navCtrl.setRoot(HomePage); */
  }

}


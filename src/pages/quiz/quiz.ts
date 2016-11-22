import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

declare var AdMob: any;

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  private admobId: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform = platform;

    if (/(android)/i.test(navigator.userAgent))
      this.admobId = { banner: 'ca-app-pub-4689559823917632/6665370302' };

    else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent))
      this.admobId = { banner: 'ca-app-pub-4689559823917632/9618836708' };

    this.createBanner();
    this.showBanner("bottom");

  }

  createBanner() {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          autoShow: false
        });
      }
    });
  }

  showBanner(position) {
    this.platform.ready().then(() => {
      if (AdMob) {
        var positionMap = {
          "bottom": AdMob.AD_POSITION.BOTTOM_CENTER,
          "top": AdMob.AD_POSITION.TOP_CENTER
        };
        AdMob.showBanner(positionMap[position.toLowerCase()]);
      }
    });
  }

  hideBanner(position) {
    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.hideBanner();
      }
    });
  }

  openSettings(type) {
    this.navCtrl.push(SettingsPage, { type: type });
  }

  ionViewDidLoad() {
    console.log('Hello Quiz Page');
  }

}

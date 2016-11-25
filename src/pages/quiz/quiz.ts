import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { AdMobModule } from '../../providers/Ad-mob-module';

// declare var AdMob: any;

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  // private admobId: any;
  isCreated : boolean;
  isDisplayed : boolean;

  constructor(public navCtrl: NavController, public platform: Platform, public adMobModule: AdMobModule) {

    // Create and display AdMob banner
    adMobModule.createBanner();  
  }

  openSettings(type) {
    this.navCtrl.push(SettingsPage, { type: type });
  }

  ionViewDidLoad() {
    console.log('Hello Quiz Page');
  }

}

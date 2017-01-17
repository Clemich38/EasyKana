import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { AdMobModule } from '../../providers/Ad-mob-module';
import { Kanas } from '../../providers/kanas';

// declare var AdMob: any;

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public adMobModule: AdMobModule,
              public kanas: Kanas) {

    // Create and display AdMob banner
    adMobModule.createBanner();  
  }

  openSettings(type) {
    this.navCtrl.push(SettingsPage, { type: type });
  }

  // ionViewDidLoad() {
  //   console.log('Hello Quiz Page');
  // }

}

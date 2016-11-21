import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  constructor(public navCtrl: NavController) {}


  openSettings(type) {
    this.navCtrl.push(SettingsPage, {type: type});
  }

  ionViewDidLoad() {
    console.log('Hello Quiz Page');
  }

}

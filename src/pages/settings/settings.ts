import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  quizType : number;

  constructor(public navCtrl: NavController,
  						  public navParams: NavParams)
  {
    // Get the quiz type (hiragana or katakana)
    this.quizType = this.navParams.get('type');
  }

  openQuestion(mode) {
    this.navCtrl.push(QuestionPage, {type: this.quizType, mode: mode});
  }

  // ionViewDidLoad() {
  //   console.log('Hello Settings Page');
  // }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  constructor(public navCtrl: NavController) {}


  openQuestion(type, mode) {
    this.navCtrl.push(QuestionPage, {type: type, mode: mode});
  }

  ionViewDidLoad() {
    console.log('Hello Quiz Page');
  }

}

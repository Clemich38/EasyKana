import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {

  constructor(public navCtrl: NavController) {}


  openQuestion() {
    this.navCtrl.push(QuestionPage);
  }

  ionViewDidLoad() {
    console.log('Hello Quiz Page');
  }

}

import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { QuizPage } from '../pages/quiz/quiz';
import { QuestionPage } from '../pages/question/question';
import { ResultPage } from '../pages/result/result';
import { HiraganaPage } from '../pages/hiragana/hiragana';
import { KatakanaPage } from '../pages/katakana/katakana';

import { Kanas } from '../providers/kanas';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = QuizPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage,
    public kanas: Kanas
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Quiz', component: QuizPage },
      { title: 'Hiragana', component: HiraganaPage },
      { title: 'Katakana', component: KatakanaPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

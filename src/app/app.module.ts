import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { QuizPage } from '../pages/quiz/quiz';
import { QuestionPage } from '../pages/question/question';
import { ResultPage } from '../pages/result/result';
import { HiraganaPage } from '../pages/hiragana/hiragana';
import { KatakanaPage } from '../pages/katakana/katakana';
import { PopoverMenuPage } from '../pages/popover-menu/popover-menu';
import { Kanas } from '../providers/kanas';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    QuizPage,
    QuestionPage,
    ResultPage,
    HiraganaPage,
    KatakanaPage,
    PopoverMenuPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuizPage,
    QuestionPage,
    ResultPage,
    HiraganaPage,
    KatakanaPage,
    PopoverMenuPage
  ],
  providers: [Kanas, Storage]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { QuizPage } from '../pages/quiz/quiz';
import { SettingsPage } from '../pages/settings/settings';
import { QuestionPage } from '../pages/question/question';
import { ResultPage } from '../pages/result/result';
import { HiraganaPage } from '../pages/hiragana/hiragana';
import { KatakanaPage } from '../pages/katakana/katakana';
import { PopoverMenuPage } from '../pages/popover-menu/popover-menu';
import { InfoPage } from '../pages/info/info';
import { Kanas } from '../providers/kanas';
import { AdMobModule } from '../providers/Ad-mob-module';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    QuizPage,
    SettingsPage,
    QuestionPage,
    ResultPage,
    HiraganaPage,
    KatakanaPage,
    PopoverMenuPage,
    InfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuizPage,
    SettingsPage,
    QuestionPage,
    ResultPage,
    HiraganaPage,
    KatakanaPage,
    PopoverMenuPage,
    InfoPage
  ],
  providers: [Kanas, AdMobModule, Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

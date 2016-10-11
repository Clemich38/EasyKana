import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover-menu',
  templateUrl: 'popover-menu.html'
})
export class PopoverMenuPage {

  hiraganaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  
  constructor(public viewCtrl: ViewController,
              public storage: Storage,
              public kanas: Kanas)
  {
    this.hiraganaTab = kanas.getTab();
  }

  selectAll()
  {
    for(let hir of this.hiraganaTab)
      hir.hiraganaIsLearned = true;

    // Save it
    this.kanas.saveData();

    // Close popover
    this.viewCtrl.dismiss();
  }

  selectNone()
  {
    for(let hir of this.hiraganaTab)
      hir.hiraganaIsLearned = false;

    // Save it
    this.kanas.saveData();

    // Close popover
    this.viewCtrl.dismiss();
  }

}

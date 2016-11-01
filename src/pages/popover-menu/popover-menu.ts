import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover-menu',
  templateUrl: 'popover-menu.html'
})
export class PopoverMenuPage {

  kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  
  constructor(public viewCtrl: ViewController,
              public storage: Storage,
              public kanas: Kanas)
  {
    this.kanaTab = kanas.getTab(0);
  }

  selectAll()
  {
    for(let hir of this.kanaTab)
      hir.hiraganaIsLearned = true;

    // Save it
    this.kanas.saveData(0);
    this.kanas.saveData(1);
    this.kanas.saveData(2);

    // Close popover
    this.viewCtrl.dismiss();
  }

  selectNone()
  {
    for(let hir of this.kanaTab)
      hir.hiraganaIsLearned = false;

    // Save it
    this.kanas.saveData(0);
    this.kanas.saveData(1);
    this.kanas.saveData(2);

    // Close popover
    this.viewCtrl.dismiss();
  }

}

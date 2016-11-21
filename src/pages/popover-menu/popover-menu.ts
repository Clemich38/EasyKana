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
  kanaTabV: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  kanaTabC: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  
  constructor(public viewCtrl: ViewController,
              public storage: Storage,
              public kanas: Kanas)
  {
    this.kanaTab = kanas.getTab(0);
    this.kanaTabV = kanas.getTab(1);
    this.kanaTabC = kanas.getTab(2);
  }

  selectAll(category)
  {
    if((category >= 0) && (category <= 2))
    {
      this.kanaTab = this.kanas.getTab(category);
    }
    else if(category === 3)
    {
      this.kanaTab = this.kanas.getTab(0);
      this.kanaTab = this.kanaTab.concat(this.kanas.getTab(1));
      this.kanaTab = this.kanaTab.concat(this.kanas.getTab(2));
    }
    else
      return;

    for(let hir of this.kanaTab)
      hir.hiraganaIsLearned = true;

    // Save it
    if((category >= 0) && (category <= 2))
    {
      this.kanas.saveData(category);
    }
    else if(category === 3)
    {
      this.saveAll();
    }

    // Close popover
    this.viewCtrl.dismiss();
  }

  selectNone()
  {
    // Get all kanas
    this.kanaTab = this.kanas.getTab(0);
    this.kanaTab = this.kanaTab.concat(this.kanas.getTab(1));
    this.kanaTab = this.kanaTab.concat(this.kanas.getTab(2));

    // Deselect all
    for(let hir of this.kanaTab)
      hir.hiraganaIsLearned = false;

    // Save it
    this.saveAll();

    // Close popover
    this.viewCtrl.dismiss();
  }

  saveAll()
  {
    this.kanas.saveData(0);
    this.kanas.saveData(1);
    this.kanas.saveData(2);
  }

}

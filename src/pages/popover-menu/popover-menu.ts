import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-popover-menu',
  templateUrl: 'popover-menu.html'
})
export class PopoverMenuPage {

  kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  kanaType: number;

  constructor(public viewCtrl: ViewController,
              public storage: Storage,
  						public navParams: NavParams,
              public kanas: Kanas)
  {
    // Get the kana type (hiragana or katakana)
    this.kanaType = this.navParams.get('type');
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
    {
      if(this.kanaType === 0)
        hir.hiraganaIsLearned = true;
      else if (this.kanaType === 1)
        hir.katakanaIsLearned = true;
    }

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
      if(this.kanaType === 0)
        hir.hiraganaIsLearned = false;
      else if (this.kanaType === 1)
        hir.katakanaIsLearned = false;

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

import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';
import { PopoverMenuPage } from '../popover-menu/popover-menu';
import { InfoPage } from '../info/info';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hiragana',
  templateUrl: 'hiragana.html'
})
export class HiraganaPage {
    
  hiraganaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  hiraganaCat: Array<{isExpanded: boolean}>;
  cols: any;
  rows: any;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public kanas: Kanas)
  {
    // Temporary init (to be retreived from Storage)
    this.hiraganaCat = [];
    this.hiraganaCat.push({isExpanded: true});
    this.hiraganaCat.push({isExpanded: true});
    this.hiraganaCat.push({isExpanded: true});

  	this.hiraganaTab = kanas.getTab();

  	this.cols = this.range(0, ((this.hiraganaTab).length - 1), 5);
  	// this.cols = [0, 5, 10, 15, 20];
  	this.rows = this.range(0, 4, 1);
	}
	
	range(min, max, step) {
    step = step || 1;
    var tab = [];
    for (var i = min; i <= max; i += step)
    {
        tab.push(i);
    }
    return tab;
  }

  onToggleState(index) {
    if(this.hiraganaTab[index].hiraganaIsLearned)
      this.hiraganaTab[index].hiraganaIsLearned = false;
    else
      this.hiraganaTab[index].hiraganaIsLearned = true;

    // Save it
    this.kanas.saveData();
  }

  onOpenOptions(event)
  {
    let popover = this.popoverCtrl.create(PopoverMenuPage);
    popover.present({
      ev: event
    });
  }

  onOpenInfos()
  {
    let popover = this.popoverCtrl.create(InfoPage);
    popover.present({});
  }

  isOk(romanji)
  {
    if(romanji.localeCompare(""))
      return true;
    else
      return false;
  }

  onToggleHiraganaCats(category)
  {
    this.hiraganaCat[category].isExpanded = !(this.hiraganaCat[category].isExpanded); 
  }

  ionViewDidLoad()
  {
    console.log('Hello Hiragana Page');
  }
}

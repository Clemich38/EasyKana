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
    
  kanaCat: Array<{isExpanded: boolean}>;
  fullTab: Array<{kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>}>
  cols: any;
  rows: any;
  cols1: any;
  rows1: any;
  cols2: any;
  rows2: any;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public kanas: Kanas)
  {
    // Temporary init (to be retreived from Storage)
    this.kanaCat = [];
    this.kanaCat.push({isExpanded: true});
    this.kanaCat.push({isExpanded: false});
    this.kanaCat.push({isExpanded: false});

    // Get Hiragana Array
    this.fullTab = [];
  	this.fullTab = kanas.getFullTab();

  	this.cols = this.range(0, ((this.fullTab[0].kanaTab).length - 1), 5);
  	this.rows = this.range(0, 4, 1);

  	this.cols1 = this.range(0, (this.fullTab[1].kanaTab.length - 1), 5);
  	this.rows1 = this.range(0, 4, 1);

  	this.cols2 = this.range(0, (this.fullTab[2].kanaTab.length - 1), 3);
  	this.rows2 = this.range(0, 2, 1);
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

  onToggleState(index, category) {
    if(this.fullTab[category].kanaTab[index].hiraganaIsLearned)
      this.fullTab[category].kanaTab[index].hiraganaIsLearned = false;
    else
      this.fullTab[category].kanaTab[index].hiraganaIsLearned = true;

    // Save it
    this.kanas.saveData(category);
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

  onToggleKanaCats(category)
  {
    this.kanaCat[category].isExpanded = !(this.kanaCat[category].isExpanded); 
  }

  ionViewDidLoad()
  {
    console.log('Hello Hiragana Page');
  }
}

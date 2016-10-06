import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hiragana',
  templateUrl: 'hiragana.html'
})
export class HiraganaPage {
    
  hiraganaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  cols: any;
  rows: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public kanas: Kanas)
  {
  	this.hiraganaTab = kanas.getTab();

  	this.cols = this.range(0, ((this.hiraganaTab).length - 1), 5);
  	// this.cols = [0, 5, 10, 15, 20];
  	this.rows = this.range(0, 4, 1);
	}
	
	range(min, max, step) {
    step = step || 1;
    var tab = [];
    for (var i = min; i <= max; i += step) {
        tab.push(i);
    }
    return tab;
  }

  onToggleState(index) {
    if(this.hiraganaTab[index].hiraganaIsLearned)
      this.hiraganaTab[index].hiraganaIsLearned = false;
    else
      this.hiraganaTab[index].hiraganaIsLearned = true;
  }

  ionViewDidLoad() {
    console.log('Hello Hiragana Page');
  }
}

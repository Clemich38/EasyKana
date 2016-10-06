import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-katakana',
  templateUrl: 'katakana.html',
})
export class KatakanaPage {

  katakanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
  cols: any;
  rows: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public kanas: Kanas)
  {
  	this.katakanaTab = kanas.getTab();

  	this.cols = this.range(0, ((this.katakanaTab).length - 1), 5);
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
    if(this.katakanaTab[index].katakanaIsLearned)
      this.katakanaTab[index].katakanaIsLearned = false;
    else
      this.katakanaTab[index].katakanaIsLearned = true;
  }

  onPageWillLeave() {

  }

  ionViewDidLoad() {
    console.log('Hello Katakana Page');
  }
}

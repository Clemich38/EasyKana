import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Kanas } from '../../providers/kanas';
import { PopoverMenuPage } from '../popover-menu/popover-menu';
import { InfoPage } from '../info/info';


@Component({
  selector: 'page-katakana',
  templateUrl: 'katakana.html'
})
export class KatakanaPage {
    
  kanaCat: Array<{isExpanded: boolean}>;
  fullTab: Array<{kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean, category: number}>}>
  cols: any;
  rows: any;
  cols1: any;
  rows1: any;
  cols2: any;
  rows2: any;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public kanas: Kanas)
  {
    // Temporary init (to be retreived from Storage)
    this.kanaCat = [];
    this.kanaCat = kanas.getKatakanaCat();

    // Get katakana Array
    this.fullTab = [];
  	this.fullTab = kanas.getFullTab();

  	this.cols = this.range(0, ((this.fullTab[0].kanaTab).length - 1), 5);//[0,5,10,15,20,25,30,35,40,45,50];
  	this.rows = this.range(0, 4, 1);//[0,1,2,3,4];

  	this.cols1 = this.range(0, (this.fullTab[1].kanaTab.length - 1), 5);//[0,5,10,15,20];
  	this.rows1 = this.range(0, 4, 1);//[0,1,2,3,4];

  	this.cols2 = this.range(0, (this.fullTab[2].kanaTab.length - 1), 3);//[0,3,6,9,12,15,18,21,24,27,30];
  	this.rows2 = this.range(0, 2, 1);//[0,1,2];

    if(kanas.getFirstTime())
      {
      this.onOpenInfos();
      kanas.saveFirstTime();
      }

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
    if(this.fullTab[category].kanaTab[index].katakanaIsLearned)
      this.fullTab[category].kanaTab[index].katakanaIsLearned = false;
    else
      this.fullTab[category].kanaTab[index].katakanaIsLearned = true;

    // Save it
    this.kanas.saveData(category);
  }

  onOpenOptions(event)
  {
    let popover = this.popoverCtrl.create(PopoverMenuPage, {type: 1});
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

  // ionViewDidLoad()
  // {
  //   console.log('Hello katakana Page');
  // }
}

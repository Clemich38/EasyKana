import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the Result page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {

	resultTab: Array<{hiragana: string, romanji: string, succes: boolean}>;
	goodPercentage: number;

  constructor(public navCtrl: NavController,
  						public navParams: NavParams)
  {
  	 this.resultTab = this.navParams.get('resTab');

  	 var succesNb = 0;
  	 for(let res of this.resultTab)
  	 {
  	 	if(res.succes)
  	 		succesNb++;
  	 }

  	 this.goodPercentage = Math.round(100 * succesNb / (this.resultTab.length));

  }

  ionViewDidLoad() {
    console.log('Hello Result Page');

    // Remove previous page so the back button go back to the quiz page
    this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.getPrevious(this.navCtrl.getActive())));
  }

}

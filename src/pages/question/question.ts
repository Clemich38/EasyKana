import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Kanas } from '../../providers/kanas';
import { ResultPage } from '../result/result';

/*
  Generated class for the Question page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-question',
    templateUrl: 'question.html'
  })
  export class QuestionPage {

    kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;
    fullTab: Array<{kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;}>
  
    quizTab: Array<{hiragana: string, romanji: string, succes: boolean}>;
    responseTab: Array<{romanji: string, isGood: boolean, hasBeenClicked: boolean}>;
    iterator: number;
    size: number;
    nextStr: string;
    nextDisable : boolean;
    quizIsOver : boolean;

    constructor(public navCtrl: NavController,
      public kanas: Kanas)
    {
  	// Full kana array
  	this.iterator = 0;
  	this.size = 4;
  	this.nextStr = "Next";
    this.quizIsOver = false;
    this.nextDisable = true;

    this.fullTab = kanas.getFullTab();
    this.kanaTab = this.fullTab[0].kanaTab;

  	// Build quiz array
  	this.buildQuizTab();

  	if(this.quizTab.length)
  	{
	  	// build the first responses array
	  	this.buildResponseTab(this.size, this.iterator);
	  }
    else
    {
      this.quizIsOver = true;
      this.nextStr = "No kana...";
    }

  }

  buildQuizTab()
  {
  	//Partial "quiz" array
    this.quizTab = [];
    for (let i in this.kanaTab)
    {
      if(this.kanaTab[i].hiraganaIsLearned && this.kanaTab[i].romanji.localeCompare("")) 
    	{
        this.quizTab.push({
          hiragana: this.kanaTab[i].hiragana,
          romanji:  this.kanaTab[i].romanji,
          succes: false
        });
      }
    }

    // Scramble the array
    this.quizTab = this.shuffle(this.quizTab);
  }

  buildResponseTab(size, golbalIndex)
  {
  	//Partial "quiz" array
    this.responseTab = [];
    var index = 1;
    var str = "";
    var strTab = [];

    // First item in the array is the correct answer
    this.responseTab.push({romanji: this.quizTab[golbalIndex].romanji, isGood:  true, hasBeenClicked: false});
    strTab[0] = this.quizTab[golbalIndex].romanji;

    while (index < size) 
    {
    	str = this.kanaTab[Math.floor(Math.random() * (this.kanaTab.length - 1))].romanji;

      // Check if the answer is not empty or already present in the response array
    	if(str.localeCompare("") && !(this.checkIfAlreadyPicked(str, strTab)))
    	{
        this.responseTab.push({romanji: str, isGood: false, hasBeenClicked: false});
        strTab[index++] = str; 
      }
    }

    // Scramble the array
    this.responseTab = this.shuffle(this.responseTab);
  }


  shuffle(array)
  {
    var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex)
	  {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	showResult(response)
	{
		// Modifie "next" button state
		if(this.iterator >= (this.quizTab.length - 1))
		{
			this.quizIsOver = true;
      this.nextStr = "Show results";
    }

		// Set Response button state
		response.hasBeenClicked = true;

    // Check the result
    if(response.isGood && this.nextDisable == true)
    {
      this.quizTab[this.iterator].succes = true;
    }

    this.nextDisable = false;
  }

  nextQuestion()
  {
    if(!this.quizIsOver)
    {
      this.nextDisable = true;
      this.iterator++;
      this.buildResponseTab(this.size, this.iterator);
    }
    else
    {
    	this.navCtrl.push(ResultPage, {resTab: this.quizTab});
    }
  }

  checkIfAlreadyPicked(str, strTab)
  {
    for(let i in strTab)
    {
      if(!str.localeCompare(strTab[i]))
        return true;
    }
    return false;
  }

  ionViewDidLoad() {
    console.log('Hello Question Page');
  }

}

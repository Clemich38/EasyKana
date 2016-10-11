
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Kanas {

    kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean}>;

    constructor(public storage: Storage) 
    {
        this.fetchData().then((kana) => {
 
            if(kana)
            {
                this.kanaTab = JSON.parse(kana); 
            }
            else
            {
                this.buildKanaTab();
            }
        });

        
    }

    getTab()
    {
        return this.kanaTab;
    }

    buildKanaTab()
    {
        var hiraganas =['あ', 'い', 'う', 'え', 'お',
                        'か', 'き', 'く', 'け', 'こ',
                        'さ', 'し', 'す', 'せ', 'そ',
                        'た', 'ち', 'つ', 'て', 'と',
                        'な', 'に', 'ぬ', 'ね', 'の',
                        'は', 'ひ', 'ふ', 'へ', 'ほ',
                        'ま', 'み', 'む', 'め', 'も',
                        'ら', 'り', 'る', 'れ', 'ろ',
                        'や', '　', 'ゆ', '　', 'よ',
                        'わ', '　', '　', '　', 'を',
                        'ん'];

        var katakanas =['ア', 'イ', 'ウ', 'エ', 'オ',
                        'カ', 'キ', 'ク', 'ケ', 'コ',
                        'サ', 'シ', 'ス', 'セ', 'ソ',
                        'タ', 'チ', 'ツ', 'テ', 'ト',
                        'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
                        'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
                        'マ', 'ミ', 'ム', 'メ', 'モ',
                        'ラ', 'リ', 'ル', 'レ', 'ロ',
                        'ヤ', '　', 'ユ', '　', 'ヨ',
                        'ワ', '　', '　', '　', 'ヲ',
                        'ン'];

        var romanjis = ['a', 'i', 'u', 'e', 'o',
                        'ka', 'ki', 'ku', 'ke', 'ko',
                        'sa', 'shi', 'su', 'se', 'so',
                        'ta', 'chi', 'tsu', 'te', 'to',
                        'na', 'ni', 'nu', 'ne', 'no',
                        'ha', 'hi', 'fu', 'he', 'ho',
                        'ma', 'mi', 'mu', 'me', 'mo',
                        'ra', 'ri', 'ru', 're', 'ro',
                        'ya', '', 'yu', '', 'yo',
                        'wa', '', '', '', 'o',
                        'n'];

        this.kanaTab = [];
        for (let i in hiraganas)
        {
            this.kanaTab.push({
                hiragana: hiraganas[i],
                katakana: katakanas[i],
                romanji:  romanjis[i],
                hiraganaIsLearned: false,
                katakanaIsLearned: false
            });
        }
        console.log('Kanas Tab Created');
    }

    fetchData()
    {
        return this.storage.get('kana'); 
    }

    saveData()
    {
        let newData = JSON.stringify(this.kanaTab);
        this.storage.set('kana', newData);
    }


}

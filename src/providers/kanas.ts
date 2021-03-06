import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Kanas {

    kanaTab0: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean, category: number}>;
    fullTab: Array<{kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean, category: number}>}>;
    hiraganaCat: Array<{isExpanded: boolean}>;
    katakanaCat: Array<{isExpanded: boolean}>;
    firstTime: boolean;


    constructor(public storage: Storage) 
    {
        // Fetch kanas in Storage
        this.fullTab = [];
        this.kanaTab0 = [];

        this.hiraganaCat = [];
        this.hiraganaCat.push({isExpanded: true});
        this.hiraganaCat.push({isExpanded: false});
        this.hiraganaCat.push({isExpanded: false});
        this.katakanaCat = [];
        this.katakanaCat.push({isExpanded: true});
        this.katakanaCat.push({isExpanded: false});
        this.katakanaCat.push({isExpanded: false});

        this.fullTab.push({kanaTab: this.kanaTab0});
        this.fullTab.push({kanaTab: this.kanaTab0});
        this.fullTab.push({kanaTab: this.kanaTab0});

        // To display the info popup on the 1rst app openning
        this.fetchFirstTime();


        let numbers = [0, 1, 2];
        for (let i of numbers)
        {
            this.fetchData(i)
            .then((kana) => 
            {
                if(kana)
                {
                    this.fullTab[i].kanaTab = JSON.parse(kana); 
                }
                else
                {
                    this.fullTab[i].kanaTab = this.buildKanaTab(i);
                }
            })
            .catch((ex) => 
            {
            console.error('Error fetching kana', ex);
            });
        }     


    }

    getTab(category)
    {
        return this.fullTab[category].kanaTab;
    }

    getFullTab()
    {
        return this.fullTab;
    }

    getHiraganaCat()
    {
        return this.hiraganaCat;
    }

    getKatakanaCat()
    {
        return this.katakanaCat;
    }

    buildKanaTab(category)
    {
        var kanaTab: Array<{hiragana: string, katakana: string, romanji: string, hiraganaIsLearned: boolean, katakanaIsLearned: boolean, category: number}>;
        var hiraganas=[];
        var katakanas=[];
        var romanjis=[];

        switch(category)
        {
            case 0:
                hiraganas =['あ', 'い', 'う', 'え', 'お',
                                'か', 'き', 'く', 'け', 'こ',
                                'さ', 'し', 'す', 'せ', 'そ',
                                'た', 'ち', 'つ', 'て', 'と',
                                'な', 'に', 'ぬ', 'ね', 'の',
                                'は', 'ひ', 'ふ', 'へ', 'ほ',
                                'ま', 'み', 'む', 'め', 'も',
                                'ら', 'り', 'る', 'れ', 'ろ',
                                'や', '', 'ゆ', '', 'よ',
                                'わ', '', '', '', 'を',
                                'ん'];

                katakanas =['ア', 'イ', 'ウ', 'エ', 'オ',
                                'カ', 'キ', 'ク', 'ケ', 'コ',
                                'サ', 'シ', 'ス', 'セ', 'ソ',
                                'タ', 'チ', 'ツ', 'テ', 'ト',
                                'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
                                'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
                                'マ', 'ミ', 'ム', 'メ', 'モ',
                                'ラ', 'リ', 'ル', 'レ', 'ロ',
                                'ヤ', '', 'ユ', '', 'ヨ',
                                'ワ', '', '', '', 'ヲ',
                                'ン'];

                romanjis = ['a', 'i', 'u', 'e', 'o',
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
                break;
            
            case 1:
        
                hiraganas=['が', 'ぎ', 'ぐ', 'げ', 'ご',
                                'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
                                'だ', 'ぢ', 'づ', 'で', 'ど',
                                'ば', 'び', 'ぶ', 'べ', 'ぼ',
                                'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'];
                
                katakanas=['ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
                                'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
                                'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
                                'バ', 'ビ', 'ブ', 'ベ', 'ボ',
                                'パ', 'ピ', 'プ', 'ペ', 'ポ'];
                
                romanjis= ['ga', 'gi', 'gu', 'ge', 'go',
                                'za', 'ji', 'zu', 'ze', 'zo',
                                'da', 'ji', 'zu', 'de', 'do',
                                'ba', 'bi', 'bu', 'be', 'bo',
                                'pa', 'pi', 'pu', 'pe', 'po'];
                break;
            
            case 2:
        
                hiraganas=['きゃ', 'きゅ', 'きょ',
                        　　'ぎゃ', 'ぎゅ', 'ぎょ',
                        　　'しゃ', 'しゅ', 'しょ',
                        　　'じゃ', 'じゅ', 'じょ',
                        　　'ちゃ', 'ちゅ', 'ちょ',
                        　　'りゃ', 'りゅ', 'りょ',
                        　　'にゃ', 'にゅ', 'にょ',
                        　　'みゃ', 'みゅ', 'みょ',
                        　　'ひゃ', 'ひゅ', 'ひょ',
                        　　'びゃ', 'びゅ', 'びょ',
                        　　'ぴゃ', 'ぴゅ', 'ぴょ'];
                
                katakanas=['キャ', 'キュ', 'キョ',
                        　　'ギャ', 'ギュ', 'ギョ',
                        　　'シャ', 'シュ', 'ショ',
                        　　'ジャ', 'ジュ', 'ジョ',
                        　　'チャ', 'チュ', 'チョ',
                        　　'リャ', 'リュ', 'リョ',
                        　　'ニャ', 'ニュ', 'ニョ',
                        　　'ミャ', 'ミュ', 'ミョ',
                        　　'ヒャ', 'ヒュ', 'ヒョ',
                        　　'ビャ', 'ビュ', 'ビョ',
                        　　'ピャ', 'ピュ', 'ピョ'];
                
                romanjis= ['kya', 'kyu', 'kyo',
                        　　'gya', 'gyu', 'gyo',
                        　　'sha', 'shu', 'sho',
                        　　'ja', 'ju', 'jo',
                        　　'cha', 'chu', 'cho',
                        　　'rya', 'ryu', 'ryo',
                        　　'nya', 'nyu', 'nyo',
                        　　'mya', 'myu', 'myo',
                        　　'hya', 'hyu', 'hyo',
                        　　'bya', 'byu', 'byo',
                        　　'pya', 'pyu', 'pyo'];
                break;
            default:
                break;
        }


        kanaTab = [];
        for (let i in hiraganas)
        {
            kanaTab.push({
                hiragana: hiraganas[i],
                katakana: katakanas[i],
                romanji:  romanjis[i],
                hiraganaIsLearned: false,
                katakanaIsLearned: false,
                category: category
            });
        }
        // console.log('Kanas Tab Created');

        if(category === 0)
        {
            if(kanaTab.length >=3)
            {
                kanaTab[0].hiraganaIsLearned = true;
                kanaTab[1].hiraganaIsLearned = true;
                kanaTab[2].hiraganaIsLearned = true;
            }
        }

        return kanaTab;
    }

    fetchData(category)
    {
        switch(category)
        {
            case 0:
                return this.storage.get('kana');
            case 1:
                return this.storage.get('kanaV');
            case 2:
                return this.storage.get('kanaC');
            default:
                return this.storage.get('kana');
        }
    }

    saveData(category)
    {
        let newData = JSON.stringify(this.fullTab[category].kanaTab);
        switch(category)
        {
            case 0:
                this.storage.set('kana', newData);
                break;
            case 1:
                this.storage.set('kanaV', newData);
                break;
            case 2:
                this.storage.set('kanaC', newData);
                break;
            default:
                this.storage.set('kana', newData);
        }

    }

    getFirstTime()
    {
        return this.firstTime;
    }

    fetchFirstTime()
    {
        this.storage.get('firstTime')
        .then((firstTime) => 
            {
                if(firstTime === null)
                    this.firstTime = true;
                else
                    this.firstTime = JSON.parse(firstTime); 
            })
    }

    saveFirstTime()
    {
        this.firstTime = false;
        let newData = JSON.stringify(this.firstTime);
        this.storage.set('firstTime', newData);
    }

}

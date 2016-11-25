import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

declare var AdMob: any;

@Injectable()
export class AdMobModule {

  private admobId: any;
  bannerIsCreated : boolean;

  constructor(public platform: Platform) 
  {
    this.platform = platform;
    this.bannerIsCreated = false;

    if (/(android)/i.test(navigator.userAgent))
      this.admobId = { banner: 'ca-app-pub-4689559823917632/6665370302' };

    else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent))
      this.admobId = { banner: 'ca-app-pub-4689559823917632/9618836708' };
    
  }

  createBanner() {
    if(!this.bannerIsCreated)
    {
      this.platform.ready()
      .then(() => {
        if (AdMob) {
          AdMob.createBanner({
            adId: this.admobId.banner,
            position:AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow: true
          })
        this.bannerIsCreated = true;
        }
      });

    }
  }
}

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  navLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  // ionViewDidLoad(){
  //   this.storage.get('intro-done').then(done => {
  //     if (done) {       
  //       this.navCtrl.setRoot(LoginPage);
  //     }
  //     if(!done){
  //       this.storage.set('intro-done', true);
  //     }
  //   });

  //   this.storage.clear();
  // }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus'
import { AngularFireModule } from 'angularfire2'
import firebase  from 'firebase'
import { MyProductsPage } from '../my-products/my-products';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userInfo = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleplus:GooglePlus) {
  }

  login(){
    this.googleplus.login({
      'webClientId':'315821383437-sqot7oslav990jtqk1kem0j10enuh3a1.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
        this.userInfo = {name: res.displayName, email: res.email, profileImage: res.imageUrl};
        alert("LOGIN SUCCESS")
        alert(JSON.stringify(res));
        this.navCtrl.setRoot(MyProductsPage);
      }).catch(ns=>{
        alert("NOT LOGGED")
        alert(JSON.stringify(ns));
      })
    })
  }

  mockLogin(){
    this.navCtrl.setRoot(MyProductsPage);
  }

}

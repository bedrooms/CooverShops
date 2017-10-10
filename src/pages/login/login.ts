import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus'
import { AngularFireModule } from 'angularfire2'
import firebase  from 'firebase'
import { MyProductsPage } from '../my-products/my-products';
import { userInfo } from '../../app/global';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userInfo = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public googleplus:GooglePlus) {
  }

  login(){
    this.googleplus.login({
      'webClientId':'315821383437-sqot7oslav990jtqk1kem0j10enuh3a1.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>{
        try{
        this.userInfo = {name: res.displayName, email: res.email, profileImage: res.imageUrl, userId: res.userId};
        // alert(JSON.stringify(this.userInfo));
        // alert(res.userId);
        userInfo.userId = res.userId;
        userInfo.userMail = res.email;
        userInfo.userName = res.displayName;
        userInfo.userImage = res.imageUrl;
        this.presentToast("LOGIN SUCCESS");
        this.navCtrl.setRoot(MyProductsPage);
      }
      catch(error){
        alert("error authentication")
        alert(JSON.stringify(error));
      }
      }).catch(ns=>{
        this.presentToast("NOT LOGGED")
        alert(JSON.stringify(ns));
      })
    })
  }

  mockLogin(){
    this.navCtrl.setRoot(MyProductsPage);
    userInfo.userId = "115503332272420770807";
    userInfo.userName = "Mock Log In";
    userInfo.userImage = "https://lh4.googleusercontent.com/-G2fApxVoov0/AAAAAAAAAAI/AAAAAAAAACg/sQgOUzEdkeM/s96-c/photo.jpg";
    this.presentToast("LOGGED")
  }

  presentToast(_message) {
    const toast = this.toastCtrl.create({
      message: _message,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

}

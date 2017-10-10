import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { userInfo } from '../../app/global';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

  userId: null
  userMail: null
  userName
  userImage

  constructor(public navCtrl: NavController) {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.userName = userInfo.userName;
    this.userImage = userInfo.userImage;
  }

}

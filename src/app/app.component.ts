import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SettingsPage } from '../pages/settings/settings';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ProductsPage } from '../pages/products/products';
import { MyProductsPage } from '../pages/my-products/my-products';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';

import { TranslateService } from '@ngx-translate/core';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(private translate: TranslateService, platform: Platform, statusBar: StatusBar, private config: Config, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');

    this.translate.use('es'); // Set your language here
    

    // this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
    //   this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    // });
  }
  goToMyProducts(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MyProductsPage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SettingsPage);
  }goToMyProfile(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MyProfilePage);
  }goToAllProducts(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProductsPage);
  }
}

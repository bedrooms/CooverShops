import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MyProductsPage } from '../pages/my-products/my-products';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { SettingsPage } from '../pages/settings/settings';
import { ProductPage } from '../pages/product/product';
import { LoginPage } from '../pages/login/login';
import { NewAccountPage } from '../pages/new-account/new-account';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { GooglePlus } from '@ionic-native/google-plus'
import { AngularFireModule } from 'angularfire2'
import firebase  from 'firebase'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig={
  apiKey: "AIzaSyAO8G2lDlbO0Ji18EyPpRKoaO0T8Qgv374",
  authDomain: "barcode-5fc0a.firebaseapp.com",
  databaseURL: "https://barcode-5fc0a.firebaseio.com",
  projectId: "barcode-5fc0a",
  storageBucket: "barcode-5fc0a.appspot.com",
  messagingSenderId: "315821383437"
}
firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    MyProductsPage,
    MyProfilePage,
    SettingsPage,
    ProductPage,
    LoginPage,
    NewAccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyProductsPage,
    MyProfilePage,
    SettingsPage,
    ProductPage,
    LoginPage,
    NewAccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    GooglePlus
  ]
})
export class AppModule {}
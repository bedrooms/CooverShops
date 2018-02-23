import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Storage, StorageConfig, StorageConfigToken, IonicStorageModule } from '@ionic/storage';
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
import { ProductsPage } from '../pages/products/products';
import { IntroPage } from '../pages/intro/intro';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { GooglePlus } from '@ionic-native/google-plus'
import { AngularFireModule } from 'angularfire2'
import firebase  from 'firebase'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductsDataProvider } from '../providers/products-data/products-data';

//import { Http } from '@angular/http';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const firebaseConfig={
  apiKey: "AIzaSyAO8G2lDlbO0Ji18EyPpRKoaO0T8Qgv374",
  authDomain: "barcode-5fc0a.firebaseapp.com",
  databaseURL: "https://barcode-5fc0a.firebaseio.com",
  projectId: "barcode-5fc0a",
  storageBucket: "barcode-5fc0a.appspot.com",
  messagingSenderId: "315821383437"
}
firebase.initializeApp(firebaseConfig)

// export function createTranslateLoader(http: Http) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    MyApp,
    MyProductsPage,
    MyProfilePage,
    SettingsPage,
    ProductPage,
    LoginPage,
    NewAccountPage,
    ProductsPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [Http]
    //   }
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyProductsPage,
    MyProfilePage,
    SettingsPage,
    ProductPage,
    LoginPage,
    NewAccountPage,
    ProductsPage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    GooglePlus,
    Camera,
    ProductsDataProvider
  ]
})
export class AppModule {}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  items = [];
  productsListData = [];

  constructor(public navCtrl: NavController, private dbf: AngularFireDatabase) {
    this.dbf.list("/products/product/").subscribe(_data => {
      this.productsListData = _data;
      console.log(_data)
    });

    for (let i = 0; i < 10; i++) {
      this.items.push( this.productsListData.length );
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        this.productsListData.push( this.productsListData.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  
}

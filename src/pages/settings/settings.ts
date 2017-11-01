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
  currentLength;

  constructor(public navCtrl: NavController, private dbf: AngularFireDatabase) {
    this.dbf.list("/products/product/").subscribe(_data => {
      this.productsListData = _data;
      console.log(_data)
      for (let i = 0; i < 10; i++) {
        this.items.push(this.productsListData[i]);
      }
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.currentLength = this.items.length;
    if (this.currentLength <= this.items.length) {
      setTimeout(() => {
        for (let i = this.currentLength; i < (this.currentLength + 4); i++) {
          if(i >= this.productsListData.length){
            break;
          }
          this.items.push(this.productsListData[i]);
        }

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }
  }

}

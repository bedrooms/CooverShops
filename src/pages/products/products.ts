import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  productsListData:{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbf: AngularFireDatabase) {
    this.dbf.list("/products/product/").subscribe(_data => {
      this.productsListData = _data;
      console.log(_data)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}

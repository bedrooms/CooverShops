import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'
import { ProductPage } from "../product/product"
import { ProductsDataProvider } from '../../providers/products-data/products-data'

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  items = [];
  productsListData = [];
  productsListSearchData = [];
  productsListBeforeSearchData = [];
  currentLength;
  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbf: AngularFireDatabase, private productDP: ProductsDataProvider) {
    productDP.loadInitialProductData();
    this.items = productDP.items;
    this.productsListData = productDP.productsListData;
    this.productsListBeforeSearchData = productDP.productsListBeforeSearchData;
    
    // this.dbf.list("/products/product/").subscribe(_data => {
    //   this.items = _data;
    //   console.log(_data)
    //   for (let i = 0; i < 10; i++) {
    //     this.productsListData.push(this.items[i]);
    //   }
    //   this.productsListBeforeSearchData = this.productsListData;
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  productDetails(barcode){
    this.navCtrl.push(ProductPage,{
      isNewProduct:false,
      barcodeDetail:barcode
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.currentLength = this.productsListData.length;
    if (this.currentLength <= this.productsListData.length) {
      setTimeout(() => {
        for (let i = this.currentLength; i < (this.currentLength + 4); i++) {
          if(i >= this.items.length){
            break;
          }
          this.productsListData.push(this.items[i]);
        }

        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 1000);
    }
    this.productsListBeforeSearchData = this.productsListData;
  }

  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.productsListData = this.productsListBeforeSearchData;
      return;
    }
    this.productsListSearchData = this.query({
      productName: val
    });

    if(this.productsListSearchData != null){
      this.productsListData = this.productsListSearchData;
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

}

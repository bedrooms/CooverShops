import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
import firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'
import { MyProductsPage } from '../my-products/my-products';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  options: BarcodeScannerOptions;
  results: { cancelled, format, text };
  isNewProduct;
  barcodeDetail;
  showProductForm;
  tittle;
  arrData = [];
  public productGlobal: { barcode: string, productName: string, price: number, storeId: number };
  stores: {};



  constructor(private dbf: AngularFireDatabase, private toastCtrl: ToastController, private barcode: BarcodeScanner, public navCtrl: NavController, navParameters: NavParams) {
    this.isNewProduct = navParameters.get("isNewProduct");
    this.barcodeDetail = navParameters.get("barcodeDetail");
    this.showProductForm = !this.isNewProduct;
    const preObject = document.getElementById('object');
    this.dbf.list("/products/").subscribe(_data => {
      this.arrData = _data;
    });

    dbf.list('/stores/store').forEach(_dat => {
      this.stores = _dat;
    });

    if (this.barcodeDetail != undefined) {
      this.loadProductDetail();
    }

  }


  saveProduct() {
    firebase.database().ref('/products/product/' + this.results.text).set({
      "barcode": this.results.text,
      "productName": this.productGlobal.productName,
      "productPrice": this.productGlobal.price,
      "storeId": this.productGlobal.storeId
    });

    this.presentToast("Product added!");
    this.navCtrl.setRoot(MyProductsPage);
  }

  loadProductDetail() {

    var resultProductData = firebase.database().ref('/products/product/' + this.barcodeDetail).once('value').then(productData => {
      console.log(productData.val());
      this.productGlobal = {
        "barcode": this.barcodeDetail,
        "price": productData.val().productPrice,
        "productName": productData.val().productName,
        "storeId": productData.val().storeId
      }
    });

  }


  ionViewDidLoad() {
    if (this.isNewProduct == true) {
      this.tittle = "Is New Product";
    }
  }

  presentToast(_message) {
    const toast = this.toastCtrl.create({
      message: _message,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  async scanBarcode() {
    console.log(this.productGlobal);
    this.options = {
      showTorchButton: true
    }
    this.results = await this.barcode.scan(this.options);
    this.showProductForm = true;
    this.productGlobal = { "barcode": this.results.text, "price": 0.00, "productName": null, "storeId": 1 };

    var resultProductData = firebase.database().ref('/products/product/' + this.results.text).once('value').then(productData => {
      console.log(productData.val());
      this.productGlobal = {
        "barcode": this.results.text,
        "price": productData.val().productPrice,
        "productName": productData.val().productName,
        "storeId": productData.val().storeId
      }
    });
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
import firebase  from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  options: BarcodeScannerOptions;
  results: {cancelled,format,text};
  isNewProduct;
  showProductForm;
  tittle;
  arrData =[];
  public productGlobal: {productName:string, price:number, storeId:number};
  stores:{};
  
  

  constructor(private dbf: AngularFireDatabase, private barcode: BarcodeScanner, public navCtrl: NavController, navParameters: NavParams) {
    this.isNewProduct = navParameters.get("isNewProduct");
    this.showProductForm = !this.isNewProduct;
    const preObject = document.getElementById('object');
    this.dbf.list("/products/").subscribe(_data => {
      this.arrData = _data;
    });

   dbf.list('/stores/store').forEach(_dat =>{
     this.stores = _dat;
    } );

  }


  saveProduct(){
    firebase.database().ref('/products/product/' + this.results.text).set({
      "barcode": this.results.text, 
      "productName":this.productGlobal.productName, 
      "productPrice":this.productGlobal.price, 
      "storeId":this.productGlobal.storeId
    });
  }
  

  ionViewDidLoad(){
    if(this.isNewProduct == true){
      this.tittle = "Is New Product";
    }
  }

  async scanBarcode(){
        console.log(this.productGlobal);
        this.options = {
          prompt:'Scan the Barcode.'
        }
        this.results = await this.barcode.scan(this.options);        
        this.showProductForm = true;
        this.productGlobal={"price": 0.00,"productName": null,"storeId": 1};

        var resultProductData = firebase.database().ref('/products/product/' + this.results.text).once('value').then(productData => {   
          console.log(productData.val());
          this.productGlobal={
            "price": productData.val().productPrice,
            "productName": productData.val().productName,
            "storeId": productData.val().storeId
          }
          });
      }
  
}

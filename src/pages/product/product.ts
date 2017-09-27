import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner'

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  options: BarcodeScannerOptions;
  results: {};
  isNewProduct;
  showProductForm;
  tittle;

  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, navParameters: NavParams) {
    this.isNewProduct = navParameters.get("isNewProduct");
    this.showProductForm = !this.isNewProduct;

  }

  ionViewDidLoad(){
    if(this.isNewProduct == true){
      this.tittle = "Is New Product";
    }
  }

  async scanBarcode(){
    
        this.options = {
          prompt:'Scan the Barcode.'
        }
    
        this.results = await this.barcode.scan(this.options);
        this.showProductForm = true;
        console.log(this.results);
      }
  
}

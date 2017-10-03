import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductPage } from "../product/product"
import { AngularFireDatabase } from 'angularfire2/database'
 
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

  productsListData:{};

  constructor(private dbf: AngularFireDatabase, public navCtrl: NavController) {

    this.dbf.list("/products/product/").subscribe(_data => {
      this.productsListData = _data;
      console.log(_data);
      
    });

  }

  addNewProduct(){
    this.navCtrl.push(ProductPage,{
      isNewProduct:true
    });
  }

  productDetails(barcode){
    this.navCtrl.push(ProductPage,{
      isNewProduct:false,
      barcodeDetail:barcode
    });
    
  }

  
}

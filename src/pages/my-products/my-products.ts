import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductPage } from "../product/product"
 
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

  constructor(public navCtrl: NavController) {
  }

  addNewProduct(){
    this.navCtrl.push(ProductPage,{
      isNewProduct:true
    });
  }

  productDetails(){
    this.navCtrl.push(ProductPage,{
      isNewProduct:false
    });
    
  }

  
}

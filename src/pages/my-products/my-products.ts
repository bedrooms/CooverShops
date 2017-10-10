import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from "../product/product"
import { AngularFireDatabase } from 'angularfire2/database'
import { userInfo } from '../../app/global';
import firebase from 'firebase'
 
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

  productsListData:{};
  public productsListDataTest=[];
  userId;
  rootRef = firebase.database().ref();

  constructor(private dbf: AngularFireDatabase, public navCtrl: NavController, navParameters: NavParams) { 
    this.getProductsByUser();
  }

  getProductsByUser(){
    this.rootRef.child("/products/productByUser/" + userInfo.userId).on('child_added', snap => {  
      let productRef = this.rootRef.child("/products/product/").child(snap.key);
      productRef.once('value').then(data => {
        console.log(snap.val());
        this.productsListDataTest.push({
          "barcode": data.val().barcode,          
          "user_ProductPrice": snap.val().productPrice,
          "productPrice": data.val().productPrice,
          "productName": data.val().productName,
          "storeId": data.val().storeId,
          "lowest" : (data.val().productPrice < snap.val().productPrice) ? true:false 
        }
      )        
      });
      

    })
    console.log(this.productsListDataTest);
    this.productsListData = this.productsListDataTest;

  }

  ionViewDidEnter(){
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

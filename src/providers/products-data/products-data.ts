import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database'
import { userInfo } from '../../app/global';
import { Product } from '../../models/product'
import firebase from 'firebase'
import 'rxjs/add/operator/map';


/*
  Generated class for the ProductsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsDataProvider {

  public items = [];
  public productsListData = []; 
  public productsListBeforeSearchData = [];
  public myProductsListData=[];
  public productDataResult : Product;

  rootRef = firebase.database().ref();

  constructor(public http: Http, private dbf: AngularFireDatabase) {
   
  }

  public loadInitialProductData(){
    this.dbf.list("/products/product/").subscribe(_data => {
      this.items = _data;
      console.log(_data)
      for (let i = 0; i < 10; i++) {
        this.productsListData.push(this.items[i]);
      }
      this.productsListBeforeSearchData = this.productsListData;
    });
  }

  getProductsByUser(){
    this.rootRef.child("/products/productByUser/" + userInfo.userId).on('child_added', snap => {  
      let productRef = this.rootRef.child("/products/product/").child(snap.key);
      productRef.once('value').then(data => {
        console.log(snap.val());
        this.myProductsListData.push({
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
    //console.log(this.productsListDataTest);
    //this.productsListData = this.productsListDataTest;
  }

  getProductById(barcodeDetail : string){    
    this.productDataResult = new Product();
    console.log("Product Data -->", this.productDataResult);
         firebase.database().ref('/products/product/' + barcodeDetail).once('value').then(productData => {
            console.log("Result -->", productData.val());
            this.productDataResult = {
              "barcode": barcodeDetail,
              "price": productData.val().productPrice,
              "productName": productData.val().productName,
              "storeId": productData.val().storeId
            }
          });        
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
import firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'
import { MyProductsPage } from '../my-products/my-products';
import { ToastController } from 'ionic-angular';
import { userInfo } from '../../app/global';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductsDataProvider } from '../../providers/products-data/products-data'
import { Product } from '../../models/product'

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
  productDetail: Product;
  stores: {};
  public base64Image;


  constructor(public camera: Camera, 
              private dbf: AngularFireDatabase, 
              private toastCtrl: ToastController, 
              private barcode: BarcodeScanner, 
              public navCtrl: NavController, 
              navParameters: NavParams,
              private productDP: ProductsDataProvider) {
    console.log('Contructor ProductsPage');
    this.productDetail = new Product();
    this.isNewProduct = navParameters.get("isNewProduct");
    this.barcodeDetail = navParameters.get("barcodeDetail");
    this.showProductForm = !this.isNewProduct;
    // const preObject = document.getElementById('object');
    // this.dbf.list("/products/").subscribe(_data => {
    //   this.arrData = _data;
    // });

    dbf.list('/stores/store').forEach(_dat => {
      this.stores = _dat;
    });

    if (this.barcodeDetail != undefined) {
      this.loadProductDetail();
    }

  }

  saveProduct() {    
    // firebase.database().ref('/products/product/' + this.productGlobal.barcode).set({
    //   "barcode": this.productGlobal.barcode,
    //   "productName": this.productGlobal.productName,
    //   "productPrice": this.productGlobal.price,
    //   "storeId": this.productGlobal.storeId
    // });

    // firebase.database().ref('/products/productByUser/' + userInfo.userId + "/" + this.productGlobal.barcode).set({
    //   "barcode": this.productGlobal.barcode,      
    //   "productPrice": this.productGlobal.price,
    //   "user": userInfo.userId
    // });

    // this.presentToast("Product added!");
    // this.navCtrl.setRoot(MyProductsPage);
  }

  loadProductDetail() {

    this.productDP.getProductById(this.barcodeDetail);
    

    // var resultProductData = firebase.database().ref('/products/product/' + this.barcodeDetail).once('value').then(productData => {
    //   console.log(productData.val());
    //   this.productGlobal = {
    //     "barcode": this.barcodeDetail,
    //     "price": productData.val().productPrice,
    //     "productName": productData.val().productName,
    //     "storeId": productData.val().storeId
    //   }
    // });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
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
    // console.log(this.productGlobal);
    // this.options = {
    //   showTorchButton: true
    // }
    // this.results = await this.barcode.scan(this.options);
    // this.showProductForm = true;
    // this.productGlobal = { "barcode": this.results.text, "price": 0.00, "productName": null, "storeId": 1 };

    // var resultProductData = firebase.database().ref('/products/product/' + this.results.text).once('value').then(productData => {
    //   console.log(productData.val());
    //   this.productGlobal = {
    //     "barcode": this.results.text,
    //     "price": productData.val().productPrice,
    //     "productName": productData.val().productName,
    //     "storeId": productData.val().storeId
    //   }
    // });
  }

  // takePicture(){
  //   this.camera.getPicture({
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       targetWidth: 1000,
  //       targetHeight: 1000
  //   }).then((imageData) => {
  //     // imageData is a base64 encoded string
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //   }, (err) => {
  //       console.log(err);
  //   });
  // }

  takePicture()
  {
    const options: CameraOptions = {
    quality: 100,
    targetHeight: 400,
    targetWidth: 400,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = imageData;
  
    //this.base64Image = imageData
    this.createThumbnail(base64Image);
  
    }, (err) => {
      console.log("Error: ", err);
    });
  }

  createThumbnail(bigImg: any) {
    this.generateFromImageTN(bigImg, 200, 200, 0.5, data => {
      this.base64Image = data;     
    });
  }

  generateFromImageTN(img, MAX_WIDTH: number, MAX_HEIGHT: number, quality: number, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();
    
    image.onload = () => {
      var width = image.width;
      var height = image.height;
 
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
 
      ctx.drawImage(image, 0, 0, width, height);
 
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);
 
      callback(dataUrl)
    }
    image.src = img;
  }

}

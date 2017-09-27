import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
import { AngularFireModule } from 'angularfire2'
import firebase  from 'firebase'

/**
 * Generated class for the HomeappPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export interface PageInterface{
   tittle:string;
   pageName:string;
   tabComponent?:any;
   index?:any;
   icon:string;
 }

@IonicPage()
@Component({
  selector: 'page-homeapp',
  templateUrl: 'homeapp.html',
})
export class HomeappPage {

  options: BarcodeScannerOptions;
  results: {};
  tittle;



  constructor(private barcode: BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {
  }

  async scanBarcode(){
    
        this.tittle = "Barcode";
    
        this.options = {
          prompt:'Scan the Barcode.'
        }
    
        this.results = await this.barcode.scan(this.options);
        console.log(this.results);
      }

}

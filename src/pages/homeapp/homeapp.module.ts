import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeappPage } from './homeapp';

@NgModule({
  declarations: [
    HomeappPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeappPage),
  ],
})
export class HomeappPageModule {}

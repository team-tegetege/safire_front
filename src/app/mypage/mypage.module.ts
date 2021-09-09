import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MypagePage } from './mypage.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MypagePageRoutingModule } from './mypage-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MypagePageRoutingModule
  ],
  declarations: [MypagePage]
})
export class MypagePageModule {}

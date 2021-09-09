import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypagePage } from './mypage.page';

const routes: Routes = [
  {
    path: '',
    component: MypagePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MypagePageRoutingModule {}

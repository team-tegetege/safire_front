import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'userhome',
        loadChildren: () => import('../userhome/userhome.module').then(m => m.UserHomePageModule)
      },
      {
        path: 'mypage',
        loadChildren: () => import('../mypage/mypage.module').then(m => m.MypagePageModule)
      },
      {
        path: 'new_project',
        loadChildren: () => import('../new_project/new_project.module').then(m => m.NewProjectPageModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/userhome',
      //   pathMatch: 'full'
      // }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/userhome',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

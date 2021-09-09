import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProjectPage } from './new_project.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NewProjectPageRoutingModule } from './new_project-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: NewProjectPage }]),
    NewProjectPageRoutingModule,
  ],
  declarations: [NewProjectPage]
})
export class NewProjectPageModule {}

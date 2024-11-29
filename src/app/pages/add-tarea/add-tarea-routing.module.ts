import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTareaPage } from './add-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: AddTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTareaPageRoutingModule {}

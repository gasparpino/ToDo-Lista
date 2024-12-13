import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteriaPage } from './reporteria.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteriaPageRoutingModule {}

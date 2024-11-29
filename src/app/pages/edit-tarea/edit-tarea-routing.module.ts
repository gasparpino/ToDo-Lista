import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTareaPage } from './edit-tarea.page';

const routes: Routes = [
  {
    path: ':id', // Ruta dinámica que acepta un parámetro ID
    component: EditTareaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTareaPageRoutingModule {}

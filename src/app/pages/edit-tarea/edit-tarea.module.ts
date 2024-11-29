import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTareaPageRoutingModule } from './edit-tarea-routing.module';

import { EditTareaPage } from './edit-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTareaPageRoutingModule
  ],
  declarations: [EditTareaPage]
})
export class EditTareaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTareaPageRoutingModule } from './add-tarea-routing.module';

import { AddTareaPage } from './add-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTareaPageRoutingModule
  ],
  declarations: [AddTareaPage]
})
export class AddTareaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteriaPageRoutingModule } from './reporteria-routing.module';

import { ReporteriaPage } from './reporteria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteriaPageRoutingModule
  ],
  declarations: [ReporteriaPage]
})
export class ReporteriaPageModule {}

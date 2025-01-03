import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-tarea',
    loadChildren: () => import('./pages/add-tarea/add-tarea.module').then( m => m.AddTareaPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./pages/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'edit-tarea',
    loadChildren: () => import('./pages/edit-tarea/edit-tarea.module').then( m => m.EditTareaPageModule)
  },
  {
    path: 'calendar-view',
    loadChildren: () => import('./pages/calendar-view/calendar-view.module').then( m => m.CalendarViewPageModule)
  },
  {
    path: 'reporteria',
    loadChildren: () => import('./pages/reporteria/reporteria.module').then( m => m.ReporteriaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public tareas: any[] = []; // Cambiamos a un array de objetos
  public nuevaTarea: string = ''; // Para crear nuevas tareas
  public categories: any[] = [];
  public selectedCategory: string = '';

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}

  // Cargamos las tareas al entrar a la vista
  ionViewWillEnter() {
    this.loadTareas();
    this.loadCategories();
  }

  // Método para cargar tareas desde la base de datos
  async loadTareas() {
    try {
      this.tareas = await this.sqlite.getTasks(); // Asegúrate de que getTasks devuelva objetos
      console.log('Tareas cargadas:', this.tareas);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  }

  // Método para crear una nueva tarea
  async createTask() {
    await this.sqlite.createTask({
      title: 'Nueva Tarea',
      description: 'Descripción de la tarea',
      dueDate: new Date().toISOString(),
      category: 'General',
      reminderEnabled: false
    });
    this.loadTasks();
  }
  



//elimina tarea
  async deleteTask(taskId: number) {
    try {
      await this.sqlite.deleteTask(taskId);
      console.log('Tarea eliminada:', taskId);
      this.loadTasks(); // Recarga la lista de tareas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }
  

  // Navegar a la página de agregar tarea (si aplica)
  openAddTaskPage() {
    this.navCtrl.navigateForward('/add-tarea');
  }

  async loadTasks() {
    this.tareas = await this.sqlite.getTasks();
  }
  editTask(tarea: any) {
    // Navegar a la página de edición con los datos de la tarea
    this.navCtrl.navigateForward(`/edit-tarea/${tarea.id}`);

  }
  
//categorias
  async loadCategories() {
    this.categories = await this.sqlite.getCategories();
  }

  openAddCategoryPage() {
    this.navCtrl.navigateForward('/add-category');
  }
  
}

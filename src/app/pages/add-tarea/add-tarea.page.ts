import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.page.html',
  styleUrls: ['./add-tarea.page.scss'],
})
export class AddTareaPage {
  task = {
    title: '',
    description: '',
    dueDate: '',
    category: '',
    reminderEnabled: false
  };

  categories: any[] = []; // Lista para almacenar las categorías

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}
  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      this.categories = await this.sqlite.getCategories();
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  async addTask() {
    if (!this.task.title || !this.task.dueDate) {
      console.error('El título y la fecha de vencimiento son obligatorios.');
      return;
    }

    try {
      await this.sqlite.createTask(this.task);
      console.log('Tarea creada exitosamente.');
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  }
}

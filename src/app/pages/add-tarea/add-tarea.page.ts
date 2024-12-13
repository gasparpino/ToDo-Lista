import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.page.html',
  styleUrls: ['./add-tarea.page.scss'],
})
export class AddTareaPage implements OnInit {
  task = {
    title: '',
    description: '',
    dueDate: '', // Fecha de vencimiento de la tarea
    category: '',
    reminderEnabled: false,
  };

  categories: any[] = []; // Lista de categorías

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadCategories();
    this.setDefaultDueDate(); // Establece la fecha actual como predeterminada
  }

  async loadCategories() {
    try {
      this.categories = await this.sqlite.getCategories();
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  setDefaultDueDate() {
    // Establece la fecha actual como valor predeterminado
    const today = new Date().toISOString().split('T')[0]; // Solo la fecha (YYYY-MM-DD)
    this.task.dueDate = today; // Asigna la fecha actual al campo dueDate
  }

  async addTask() {
    if (!this.task.title || !this.task.dueDate || !this.task.category) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await this.sqlite.createTask(this.task);
      console.log('Tarea creada con éxito.');
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  }
}

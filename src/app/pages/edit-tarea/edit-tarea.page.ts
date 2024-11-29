import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.page.html',
  styleUrls: ['./edit-tarea.page.scss'],
})
export class EditTareaPage implements OnInit {
  task: any = {
    id: null,
    title: '',
    description: '',
    dueDate: '',
    category: '',
    reminderEnabled: false,
  };

  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sqlite: SqliteService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.loadTask(taskId);
    this.loadCategories();
  }

  async loadTask(taskId: string | null) {
    if (!taskId) {
      console.error('ID de tarea no válido');
      this.navCtrl.navigateBack('/home');
      return;
    }

    try {
      const task = await this.sqlite.getTaskById(Number(taskId));
      if (task) {
        this.task = task;
      } else {
        console.error('Tarea no encontrada');
        this.navCtrl.navigateBack('/home');
      }
    } catch (error) {
      console.error('Error al cargar la tarea:', error);
      this.navCtrl.navigateBack('/home');
    }
  }

  async loadCategories() {
    try {
      this.categories = await this.sqlite.getCategories();
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  async updateTask() {
    if (!this.task.title || !this.task.dueDate) {
      console.error('El título y la fecha de vencimiento son obligatorios.');
      return;
    }

    try {
      await this.sqlite.updateTask(this.task.id, this.task);
      console.log('Tarea actualizada correctamente');
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  }

  async deleteTask() {
    try {
      await this.sqlite.deleteTask(this.task.id);
      console.log('Tarea eliminada correctamente');
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}

import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-reporteria',
  templateUrl: './reporteria.page.html',
  styleUrls: ['./reporteria.page.scss'],
})
export class ReporteriaPage implements OnInit {
  tasks: any[] = []; // Todas las tareas
  completedTasks: any[] = []; // Tareas completadas
  pendingTasks: any[] = []; // Tareas pendientes

  constructor(private sqlite: SqliteService) {}

  async ngOnInit() {
    await this.loadTasks();
    this.filterTasks();
  }

  // Cargar tareas desde la base de datos
  async loadTasks() {
    try {
      this.tasks = await this.sqlite.getTasks();
      console.log('Tareas cargadas:', this.tasks);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  }

  // Filtrar tareas completadas y pendientes
  filterTasks() {
    this.completedTasks = this.tasks.filter(task => task.completado === 1);
    this.pendingTasks = this.tasks.filter(task => task.completado === 0);
  }
}

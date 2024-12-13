import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.page.html',
  styleUrls: ['./calendar-view.page.scss'],
})
export class CalendarViewPage implements OnInit {
  tasks: any[] = []; // Tareas del día seleccionado
  reminderDates: string[] = []; // Fechas con recordatorios
  selectedDate: string | null = null; // Fecha seleccionada en el calendario

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    // Puedes mantener esta lógica para cargar tareas si es necesario
    this.loadTasksForMonth(year, month);
  }

  async loadTasksForMonth(year: number, month: number) {
    try {
      // Lógica para cargar tareas si es necesario
      console.log(`Cargando tareas para ${year}-${month}`);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

  async onDateChange(event: any) {
    if (!event.detail.value) {
      console.error('Fecha no válida seleccionada.');
      return;
    }

    const selectedDate = event.detail.value.split('T')[0];
    this.selectedDate = selectedDate;

    try {
      this.tasks = await this.sqlite.getTasksByDate(selectedDate);
      console.log('Tareas para la fecha seleccionada:', this.tasks);
    } catch (error) {
      console.error('Error al cargar tareas para la fecha seleccionada:', error);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/home'); // Navegar de regreso al inicio
  }
}

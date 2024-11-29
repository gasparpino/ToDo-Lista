import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public dbReady: BehaviorSubject<boolean>;
  public isWeb: boolean;
  public isIOS: boolean;
  public dbName: string;
  sqlite: any;

  constructor(private http: HttpClient) {
    this.dbReady = new BehaviorSubject(false);
    this.isWeb = false;
    this.isIOS = false;
    this.dbName = '';
  }

  async init() {
    const info = await Device.getInfo();
    const sqlite = CapacitorSQLite as any;

    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        console.error('Esta app necesita permisos para funcionar');
      }
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    } else if (info.platform == 'ios') {
      this.isIOS = true;
    }

    this.setupDatabase();
  }

  async setupDatabase() {
    const dbSetup = await Preferences.get({ key: 'first_setup_key' });

    if (!dbSetup.value) {
      this.downloadDatabase();
    } else {
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: this.dbName });
      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
    }
  }

  downloadDatabase() {
    this.http.get('assets/db/db.json').subscribe(async (jsonExport: JsonSQLite) => {
      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

      if (isValid.result) {
        this.dbName = jsonExport.database;
        await CapacitorSQLite.importFromJson({ jsonstring });
        await CapacitorSQLite.createConnection({ database: this.dbName });
        await CapacitorSQLite.open({ database: this.dbName });
        await Preferences.set({ key: 'first_setup_key', value: '1' });
        await Preferences.set({ key: 'dbname', value: this.dbName });
        this.dbReady.next(true);
      }
    });
  }

  async getDbName() {
    if (!this.dbName) {
      const dbname = await Preferences.get({ key: 'dbname' });
      if (dbname.value) {
        this.dbName = dbname.value;
      }
    }
    return this.dbName;
  }

  async createTask(task: { title: string; description: string; dueDate: string; category: string; reminderEnabled: boolean }) {
    const sql = `INSERT INTO task (title, description, dueDate, category, reminderEnabled) VALUES (?, ?, ?, ?, ?)`;
    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            task.title,
            task.description,
            task.dueDate,
            task.category,
            task.reminderEnabled ? 1 : 0
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }

  async getTasks() {
    const sql = `SELECT * FROM task`;
    const dbName = await this.getDbName();
  
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: []
    }).then((response: capSQLiteValues) => {
      // Filtra los registros que tengan valores nulos o vacíos
      const tasks = response.values || [];
      return tasks.filter(task => task.title && task.dueDate); // Filtra tareas con título y fecha
    }).catch(err => Promise.reject(err));
  }
  
  async updateTask(taskId: number, updatedTask: { title: string; description: string; dueDate: string; category: string; reminderEnabled: boolean }) {
    const sql = `UPDATE task SET title = ?, description = ?, dueDate = ?, category = ?, reminderEnabled = ? WHERE id = ?`;
    const dbName = await this.getDbName();

    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            updatedTask.title,
            updatedTask.description,
            updatedTask.dueDate,
            updatedTask.category,
            updatedTask.reminderEnabled ? 1 : 0,
            taskId
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }






  async deleteTask(taskId: number) {
    const sql = `DELETE FROM task WHERE id = ?`;
    const dbName = await this.getDbName();
  
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [taskId]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      if (this.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err));
  }
  
//categorias

async createCategory(name: string) {
  const sql = `INSERT INTO category (name) VALUES (?)`;
  const dbName = await this.getDbName();

  return CapacitorSQLite.executeSet({
    database: dbName,
    set: [
      {
        statement: sql,
        values: [name]
      }
    ]
  }).then((changes: capSQLiteChanges) => {
    if (this.isWeb) {
      CapacitorSQLite.saveToStore({ database: dbName });
    }
    return changes;
  }).catch(err => Promise.reject(err));
}

async getCategories() {
  const sql = `SELECT * FROM category`;
  const dbName = await this.getDbName();

  return CapacitorSQLite.query({
    database: dbName,
    statement: sql,
    values: []
  }).then((response: capSQLiteValues) => {
    return response.values || [];
  }).catch(err => Promise.reject(err));
}

//obtener tarea
async getTaskById(taskId: number) {
  const sql = `SELECT * FROM task WHERE id = ?`;
  const dbName = await this.getDbName();

  return CapacitorSQLite.query({
    database: dbName,
    statement: sql,
    values: [taskId],
  }).then((response: capSQLiteValues) => {
    return response.values.length > 0 ? response.values[0] : null;
  }).catch(err => Promise.reject(err));
}




}

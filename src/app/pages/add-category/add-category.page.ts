import { Component } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage {
  categoryName: string = ''; // Define la propiedad categoryName

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}

  // Define el método addCategory
  async addCategory() {
    if (!this.categoryName.trim()) {
      console.error('El nombre de la categoría no puede estar vacío.');
      return;
    }

    try {
      await this.sqlite.createCategory(this.categoryName);
      console.log('Categoría agregada exitosamente.');
      this.navCtrl.navigateBack('/home'); // Regresar a la página principal
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  }
}

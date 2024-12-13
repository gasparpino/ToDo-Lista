import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  categoryName: string = '';
  categories: any[] = [];
  isEditing: boolean = false; // Indica si estamos editando una categoría
  editingCategoryId: number | null = null; // ID de la categoría que se está editando

  constructor(private sqlite: SqliteService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadCategories(); // Carga las categorías al iniciar
  }

  // Método para manejar el formulario (Agregar o Actualizar)
  onSubmit() {
    if (this.isEditing) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  // Método para agregar categoría
  async addCategory() {
    if (!this.categoryName.trim()) {
      console.error('El nombre de la categoría no puede estar vacío.');
      return;
    }

    try {
      await this.sqlite.createCategory(this.categoryName);
      console.log('Categoría agregada exitosamente.');
      this.categoryName = ''; // Limpia el campo
      this.loadCategories(); // Actualiza la lista
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  }

  // Método para cargar las categorías
  async loadCategories() {
    try {
      this.categories = await this.sqlite.getCategories();
      console.log('Categorías cargadas:', this.categories);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  // Método para activar la edición de una categoría
  editCategory(category: any) {
    this.isEditing = true;
    this.editingCategoryId = category.id; // Guarda el ID de la categoría que se está editando
    this.categoryName = category.name; // Muestra el nombre actual en el campo de entrada
  }

  // Método para actualizar categoría
  async updateCategory() {
    if (!this.categoryName.trim()) {
      console.error('El nombre de la categoría no puede estar vacío.');
      return;
    }

    try {
      await this.sqlite.updateCategory(this.editingCategoryId, this.categoryName.trim());
      console.log('Categoría actualizada exitosamente.');
      this.resetForm(); // Reinicia el formulario
      this.loadCategories(); // Actualiza la lista
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  }

  // Método para eliminar categoría
  async deleteCategory(categoryId: number) {
    if (!confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      return;
    }

    try {
      await this.sqlite.deleteCategory(categoryId);
      console.log('Categoría eliminada exitosamente.');
      this.loadCategories(); // Actualiza la lista
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  }

  // Método para regresar a la página anterior
  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  // Reinicia el formulario después de actualizar o cancelar la edición
  resetForm() {
    this.isEditing = false;
    this.editingCategoryId = null;
    this.categoryName = '';
  }
}

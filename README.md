# TodoLista  primer commit
  Una aplicación móvil para gestionar y organizar tus tareas diarias de manera eficiente.

  se sube la aplicación, hubieron problemas de entendimiento con el código, los cuales fueron solucionados. 
# ToDoLista
  # Unidad 4 
  problemas con el guardado de una tarea en sql, llevo al menos 3 formas de guardado y no me ha dado resultado. Creo que superando esa parte lo demás será más sencillo.
  Se lograron sacar los problemas de base de datos y la aplicación guarda bien las tareas y categorias, además borra y actualiza. Se debe avanzar.
# Sincronización con Android 
  ionic capacitor clean android
  ionic capacitor sync android
  
## Instalación
1. Clonar el repositorio:
git clone https://github.com/gasparpino/ToDo-Lista.git
Comando para "paquetizar" la aplicación:
ionic cap sync

Comando para instalar el capacitor Android y generar la carpeta Android:
npm install @capacitor/android 
npx cap add android

Comando para ejecutar la aplicación en el emulador y ver los cambios en tiempo real:
ionic cap run android -l --external
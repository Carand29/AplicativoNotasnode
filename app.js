import colors from 'colors';
import {guardarDb, leerDb } from './helpers/guardarArchivos.js';
import {Menuinquirer, Pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist}  from './helpers/inquirer.js'
import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';

console.clear()

const main = async () => {

    console.log('hello world');
    console.clear()

    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDb();

    if (tareasDb){
        tareas.cargarTareasFromArray(tareasDb)
    }
    

    do{
    opt = await Menuinquirer();
        
    switch (opt) {
        case '1':
            const desc = await leerInput('Descripcion: ');        
            console.log(desc)
            tareas.crearTarea( desc )
            break;
    
        case '2':
            tareas.listadoCompleto();
            break;
        case '3':
            tareas.listarPendientesCompletadas(true);
            break;
        case '4':
            tareas.listarPendientesCompletadas(false);
            break;
        case '5':
            const ids = await mostrarListadoChecklist( tareas.ListadoArr );
            tareas.toggleCompletadas( ids );
            break;
        case '6':
            const id = await listadoTareasBorrar( tareas.ListadoArr);
            if (id !== '0' ) {
            const ok = await confirmar ('¿Estas seguro que deseas eliminar?');
            if ( ok ) {
                tareas.borrarTarea(id);
                console.log('Tarea borrada');
            }
        }
            break;
        }

    guardarDb(tareas.ListadoArr);

    await Pausa();
    }while( opt !== '0')   
    
       
}

main();
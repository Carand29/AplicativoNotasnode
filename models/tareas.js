import Tarea from './tarea.js'

class Tareas {
    _listado = {};

    get ListadoArr() {
        const Listado = [];

        //Object.keys metodo para listar las llaves dentro de un objeto
        Object.keys(this._listado).forEach( key =>{ 
        const tarea = this._listado[key];
        Listado.push(tarea)
    });
        return Listado;
    }

    constructor () {
        this._listado= {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {

        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        })
        
        
    }

    crearTarea( desc = ''){

        const tarea  = new Tarea(desc);
        this._listado [tarea.id] = tarea;
        this._listado
    }

    listadoCompleto () {    
        this.ListadoArr.forEach( (tarea, i) => {
            const idx = i + 1    
            const {desc, completadoEn} = tarea
            const estado = ( completadoEn )
                        ? 'completado'.green
                        : 'pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`)
        })

    }   

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.ListadoArr.forEach((tarea) =>{
            const {desc, completadoEn} = tarea
            const estado = ( completadoEn )
                        ? 'completado'.green
                        : 'pendiente'.red
            if (completadas){
                if (completadoEn){
                    contador += 1; 
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            } else {
                if (!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').red} ${desc} :: ${estado}`)
                }
            }
            
        })
    }

    toggleCompletadas (ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.ListadoArr.forEach((tarea)=>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
                // const tarea = this._listado[id];
                // tarea.completadoEn = null;
            }
        })

    }
}

export default Tareas;
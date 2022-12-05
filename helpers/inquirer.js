import inquirer from 'inquirer'
import colors from 'colors';

const preguntas =[{
type: 'list',
name: 'opcion',
message: '¿ Que desea hacer?',
choices: [
    {
        value:'1',
        name: `${'1.'.green} Crear Tarea`
    },
    {
        value:'2',
        name:`${'2.'.green} Listar tarea`
    },
    {
        value:'3',
        name:`${'3.'.green} Listar tareas completadas`
    },
    {
        value:'4',
        name:`${'4.'.green} Listar tareas pendientes`
    },
    {
        value:'5',
        name: `${'5.'.green} Completar tarea(s)`
    },
    {
        value:'6',
        name:`${'6.'.green} Borrar tarea`
    },
    {
        value:'0',
        name:`${'0.'.green} Salir`
    }
]

}]


export const Menuinquirer = async()=>{

console.clear();
console.log('============================='.green)
console.log('   Seleccione una opción'.cyan)
console.log('============================='.green)

const { opcion }= await inquirer.prompt(preguntas)

return( opcion );

}

const solicitud = [
    {
        type:'input',
        name:'opcion',
        message:`Presione ${'ENTER'.red} para continuar `  
    }
]
export const Pausa = async() =>{

    console.log('\n')
    await inquirer.prompt(solicitud)

}

export const leerInput = async( message ) =>{

    const quiestion = [
        {
           type:'input',
           name:'desc',
           message,
           validate(value) {
            if (value.length === 0 ){
                return'Por favor ingrese un valor';
            }
            return true;
           }

        }
    ];

    const { desc } = await inquirer.prompt(quiestion);
    return desc;

}

export const listadoTareasBorrar = async( tareas = []) => {

    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`
        }

    } )

    choices.unshift(
        {
            value: '0',
            name: '0.'.green + 'cancelar'
        }
    )

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message:'Borrar',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas);
    return id;

}

export const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

export const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    } )

   

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message:'selecciones',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

export default Menuinquirer;
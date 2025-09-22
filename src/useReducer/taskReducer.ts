// reducer para manejar las tareas

import { useReducer } from "react";

//importamos zod  v4 para validar los datos de las tareas de local storage

import * as z from "zod/v4"; //usaremos z version 4

//creamos el schema para validar las tareas
const TodoSchema = z.object({
  id: z.number(), //el id es un numero
  text: z.string().min(1), //el texto es un string minimo 1 caracter
  completed: z.boolean(), //el completado es un booleano
});
//creamos el schema para validar el estado del reducer
const TasksStateSchema = z.object({
  todos: z.array(TodoSchema), //el estado es un array de tareas
  length: z.number(), // cantidad de tareas
  completed: z.number(), // tareas completadas
  pending: z.number(), // tareas pendientes
});

// interface para las tareas
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
//! un payload es un dato extra que puede llevar una accion
// interface para el estado del reducer
interface TaskState {
  todos: Todo[]; //el estado es un array de tareas
  length: number; // cantidad de tareas
  completed: number; // tareas completadas
  pending: number; // tareas pendientes
}

// acciones para el reducer
export type TaskAction =
  //!cada accion tiene un type y puede tener un payload
  //ADD_TODO (agregar tarea) | TOGGLE_TODO (cambiar estado completado) | DELETE_TODO (eliminar tarea)

  | { type: "ADD_TODO"; payload: string } //las acciones pueden tener un payload o no
  | { type: "TOGGLE_TODO"; payload: number } //!las acciones en MAYUSCULAS por convencion
  | { type: "DELETE_TODO"; payload: number };

// estado inicial
export const getInitialState = (): TaskState => {
  //funcion que retorna el estado inicial
  const storedTodos = localStorage.getItem("tasks_app");

  if (storedTodos) {
    //JSON.parse convierte un string a un objeto o array EN ESTE CASO UN ARRAY DE TAREAS
    //!DEBEMOS VALIDAR QUE NUESTROS DATOS EN LOCAL STORAGE SEAN VALIDOS ANTES DE PARSEARLOS
    const todos: Todo[] = JSON.parse(storedTodos); //convertimos el string a un array de tareas
    //validamos los datos con zod
    const parsed = TasksStateSchema.safeParse({
      todos, //array de tareas
      length: todos.length, //cantidad de tareas
      completed: todos.filter((todo) => todo.completed).length, //cantidad de tareas completadas
      pending: todos.filter((todo) => !todo.completed).length, //cantidad de tareas pendientes
    });
    if (parsed.error) {
      //si hay un error en la validacion mostramos un error en consola y retornamos un estado inicial vacio
      console.error("Error parsing tasks from localStorage:", parsed.error);
    } else {
      return parsed.data; //retornamos los datos validados
    }
  }
  //si no hay tareas en local storage retornamos un estado inicial vacio
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0, //inicialmente no hay tareas pendientes
  };
};

// reducer es la  funcion que maneja las acciones y actualiza el estado
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  //la función reducer recibe el estado actual y una acción
  //y retorna el nuevo estado basado en el tipo de acción
  //!usamos un switch para manejar diferentes tipos de acciones
  switch (action.type) {
    case "ADD_TODO": //agregar tarea
      //creamos una nueva tarea con el payload de la acción
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      //retornamos el nuevo estado con la nueva tarea agregada al array de tareas
      return {
        ...state, //copiamos el estado actual
        length: state.length + 1, //incrementamos la cantidad de tareas
        pending: state.pending + 1, //incrementamos la cantidad de tareas pendientes
        todos: [...state.todos, newTodo], //agregamos la nueva tarea al array de tareas
      };

    case "TOGGLE_TODO": //cambiar estado completado de la tarea
      //!usamos map para recorrer el array y cambiar el estado de la tarea que queremos cambiar
      return {
        ...state, //copiamos el estado actual
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            //evaluamos si la tarea esta completada la cambiamos a pendiente y viceversa y actualizamos los contadores
            if (todo.completed) {
              state.completed = state.completed - 1;
              state.pending = state.pending + 1;
            } else {
              state.completed = state.completed + 1;
              state.pending = state.pending - 1;
            }
            //retornamos la tarea con el estado completado cambiado
            //!es importante recordar que un todo es un  objeto en cada retorno
            //!cuando usamos el spred operator copiamos las propiedades del objeto todo y luego cambiamos la propiedad completed
            return { ...todo, completed: !todo.completed }; //cambiamos el estado de completado
          }
          return todo;
        }),
      };

    case "DELETE_TODO": //eliminar tarea
      //!usamos filter para crear un nuevo array sin la tarea que queremos eliminar
      //elimninamos el todo
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      //actualizamos los contadores
      const completedTodos = currentTodos.filter(
        (todo) => todo.completed
      ).length; //actualizamos la cantidad de tareas completadas
      //la cantidad de tareas pendientes es la cantidad total de tareas menos las completadas
      const pendingTodos = currentTodos.length - completedTodos; //actualizamos la cantidad de tareas pendientes
      return {
        ...state, //copiamos el estado actual
        todos: currentTodos, //creamos un nuevo array sin la tarea que queremos eliminar
        length: currentTodos.length, //decrementamos la cantidad de tareas
        completed: completedTodos, //actualizamos la cantidad de tareas completadas
        pending: pendingTodos, //actualizamos la cantidad de tareas pendientes
      };

    default: //si la acción no es reconocida retornamos el estado actual TAMBIEN PODRIAMOS LANZAR UN ERROR
      return state;
  }
};
export default taskReducer;

/**
 * Hook para usar el reducer de tareas
 */
//
export const useTaskReducer = () => {
  // useReducer retorna el estado actual y la función dispatch para enviar acciones
  const [state, dispatch] = useReducer(taskReducer, {
    //pasamos un estado inicial con los contadores vacios
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
  }); //estado y funcion para enviar acciones

  // retornamos el estado y la función dispatch
  // para que pueda ser usada en el componente
  return { state, dispatch };
};
// 04-hooks/src/useReducer/taskReducer.ts
/**
 * useReducer es un hook de React que permite manejar el estado de un componente
 * usando un patrón basado en reducers, similar a Redux.
 * Conceptos clave:
 * - Reducer: función que recibe el estado actual y una acción, y retorna el nuevo estado.
 * - Estado inicial: valor con el que comienza el estado.
 * - Acción: objeto que describe cómo debe cambiar el estado.
 * ¿Por qué usar useReducer?
 * - Mejor manejo de estados complejos (objetos, múltiples propiedades).
 * - Facilita la organización de la lógica de actualización.
 * - Útil para aplicaciones grandes o formularios complejos.
 * Ejemplo básico de useReducer para un contador
 * 1. Definir el estado inicial
 * 2. Definir el reducer
 * 3. Componente usando useReducer
 */

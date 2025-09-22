// reducer para manejar las tareas

import { useReducer } from "react";
import react from "@vitejs/plugin-react-swc";

// interface para las tareas
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
//! un payload es un dato extra que puede llevar una accion

interface TaskState {
  todos: Todo[]; //el estado es un array de tareas
  length: number; // cantidad de tareas
  completed: number; // tareas completadas
  pending: number; // tareas pendientes
}

// acciones para el reducer
export type TaskAction =
  //usamos un union type para las acciones con |
  //!cada accion tiene un type y puede tener un payload
  //ADD_TODO (agregar tarea) | TOGGLE_TODO (cambiar estado completado) | DELETE_TODO (eliminar tarea)
  | { type: "ADD_TODO"; payload: string } //las acciones pueden tener un payload o no
  | { type: "TOGGLE_TODO"; payload: number } //!las acciones en MAYUSCULAS por convencion
  | { type: "DELETE_TODO"; payload: number };

// estado inicial
export const getInitialState = (): TaskState => {
  //funcion que retorna el estado inicial
  return {
    todos: [],
    length: 0,
    completed: 0,
    pending: 0,
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
              state.pending = state.pending + 1;
            } else {
              state.completed = state.completed + 1;
            }
            todo.completed = !todo.completed; //cambiamos el estado aqui para no repetir codigo **DRY*
          }
          return todo;
        }),
      };
    case "DELETE_TODO": //eliminar tarea
      //!usamos filter para crear un nuevo array sin la tarea que queremos eliminar
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          if (todo.id === action.payload) {
            //si el id de la tarea es igual al payload de la acción entonces actualizamos los contadores
            if (todo.completed)
              state.completed - 1; // Decrementar tareas completadas
            else state.pending - 1; // Decrementar tareas pendientes
            state.length - 1; // Decrementar total de tareas
          }
          return todo; //retornamos la tarea si no es la que queremos eliminar
        }),
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

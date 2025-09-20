/**
 *
 * una funcion pura es una funcion que siempre devuelve el mismo resultado para los mismos argumentos
 * y no tiene efectos secundarios (no modifica variables externas, no hace llamadas a APIs, etc)
 *
 * un reducer es una funcion pura que toma el estado actual y una accion, y devuelve el nuevo estado
 * devuelve un valor unicamente basado en sus entradas   o en sus argumentos
 * recibe dos argumentos: el estado actual y una accion
 *
 * useReducer en React
 *
 * useReducer es un hook que permite manejar el estado de componentes de manera más estructurada,
 * especialmente útil cuando el estado es complejo o involucra múltiples sub-valores.
 * Es una alternativa a useState, ideal para lógica de actualización de estado más avanzada.
 *
 * Conceptos clave:
 * - Reducer: función que recibe el estado actual y una acción, y retorna el nuevo estado.
 * - Estado inicial: valor con el que comienza el estado.
 * - Acción: objeto que describe cómo debe cambiar el estado.
 *
 * ¿Por qué usar useReducer?
 * - Mejor manejo de estados complejos (objetos, múltiples propiedades).
 * - Facilita la organización de la lógica de actualización.
 * - Útil para aplicaciones grandes o formularios complejos.
 */

import { useReducer } from "react";

// Ejemplo básico de useReducer para un contador

// 1. Definir el estado inicial
const initialState = { count: 0 };

// 2. Definir el reducer
function reducer(state: typeof initialState, action: { type: string }) {
  // la función reducer recibe el estado actual y una acción
  // y retorna el nuevo estado basado en el tipo de acción
  // usamos un switch para manejar diferentes tipos de acciones

  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }; //retornamos un nuevo objeto con el conteo incrementado
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error("Acción desconocida"); //si la acción no es reconocida lanzamos un error
  }
}

// 3. Componente usando useReducer
export default function Counter() {
  // useReducer retorna el estado actual y la función dispatch para enviar acciones
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Contador: {state.count}</h2>
      {/* Usamos dispatch para enviar acciones al reducer */}
      {/* Cada botón envía una acción diferente */}

      <button onClick={() => dispatch({ type: "increment" })}>
        Incrementar
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrementar
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Resetear</button>
    </div>
  );
}

/**
 * Resumen:
 * - useReducer es útil para manejar estados complejos y lógica de actualización avanzada.
 * - Se basa en el patrón reducer, similar a Redux.
 * - Ideal para componentes donde el estado depende de múltiples acciones o propiedades.
 *
 * - PATRON REDUCER
 * - Un patrón de diseño que se utiliza para manejar el estado de una aplicación de manera predecible y estructurada.
 * - Se basa en el concepto de funciones puras y la inmutabilidad del estado.
 * - El patrón reducer se compone de tres elementos principales:
 *   1. Estado (state): Representa el estado actual de la aplicación.
 *  2. Acción (action): Un objeto que describe un cambio que se desea realizar en el estado.
 * 3. Reductor (reducer): Una función pura que toma el estado actual y una acción, y devuelve un nuevo estado.
 * - El patrón reducer es especialmente útil en aplicaciones con estados complejos o múltiples sub-valores, ya que permite organizar la lógica de actualización de manera clara y predecible.
 * - En React, el hook useReducer implementa este patrón, facilitando el manejo del estado en componentes funcionales.
 * -! Es importante destacar que las funciones puras no deben tener efectos secundarios, lo que significa que no deben modificar variables externas, realizar llamadas a APIs, o interactuar con el DOM directamente.
 *
 * UN REDUCER NO ES MAS QUE UNA FUNCION QUE SIEMPRE DEVUELVE UN ESTADO NUEVO BASADO EN EL ESTADO ANTERIOR ARGUMENTES  Y UNA ACCION
 *
 * * LA ACCION DEBE TENER UNA PROPIEDAD TYPE QUE ES UNA CADENA QUE IDENTIFICA EL TIPO DE ACCION
 * * * LA ACCION PUEDE TENER OTRAS PROPIEDADES QUE CONTENGAN DATOS NECESARIOS PARA REALIZAR EL CAMBIO
 * * LA ACCION ES UN OBJETO QUE DESCRIBE EL CAMBIO QUE SE DESEA REALIZAR EN EL ESTADO
 * * * EL REDUCER ES UNA FUNCION PURA QUE TOMA EL ESTADO ACTUAL Y UNA ACCION, Y DEVUELVE UN NUEVO ESTADO
 * ! * VERIFICAR DOCS DE REACT
 *  */

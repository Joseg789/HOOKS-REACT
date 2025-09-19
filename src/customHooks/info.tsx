import { useState, useEffect } from "react";

/**
 * Custom Hooks en React
 * ---------------------
 *
 * 1. ¿Qué son?
 * - Son funciones de JavaScript que usan hooks de React (useState, useEffect, etc.) para encapsular lógica reutilizable.
 * - Permiten compartir lógica entre componentes sin repetir código.
 *
 * 2. Convenciones:
 * - El nombre debe empezar con "use" (ej: useFetch, useForm).
 * - Solo se pueden llamar dentro de componentes funcionales o de otros hooks.
 *
 * 3. Ejemplo básico:
 */

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

/**
 * 4. Ventajas:
 * - Reutilización de lógica.
 * - Código más limpio y mantenible.
 * - Separación de responsabilidades.
 *
 * 5. Buenas prácticas:
 * - No usar hooks dentro de condicionales o bucles.
 * - Mantener los hooks puros (sin efectos secundarios fuera de useEffect).
 * - Documentar el propósito y uso del custom hook.
 *
 *
 *
 *
 *
 *
 *
 * 6. Ejemplo de uso en un componente:
 */
// import { useCounter } from './info';
//crear un componente que use el custom hook useCounter
//!este componente puedes copiarlo y pegarlo en main.tsx para probarlo
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={reset}>Resetear</button>
    </div>
  );
}

/**
 * 7. Recursos:
 * - Documentación oficial: https://react.dev/reference/react/hooks#custom-hooks
 * - Buenas prácticas: https://react.dev/learn/reusing-logic-with-custom-hooks
 */

//8 estructura de un custom hook
//1. importaciones de react y otros hooks necesarios
//2. definicion del custom hook (funcion que empieza con use)
//3. definicion de estados y efectos (useState, useEffect, etc.)
//4. definicion de funciones que modifican los estados o hacen algo
//5. retornamos los estados, funciones y cualquier otra cosa que queramos exponer del hook
//6. exportamos el custom hook
//ejemplo:
export const useExample = () => {
  //1. importaciones de react y otros hooks necesarios
  //2. definicion del custom hook (funcion que empieza con use) //ya estamos en la funcion
  //3. definicion de estados y efectos (useState, useEffect, etc.)
  const [state, setState] = useState(0); //estado de ejemplo
  useEffect(() => {
    //efecto de ejemplo
    console.log("Efecto ejecutado");
  }, [state]); //dependencia del efecto

  //4. definicion de funciones que modifican los estados o hacen algo
  const increment = () => setState((s) => s + 1); //funcion para incrementar el ESTADO
  const decrement = () => setState((s) => s - 1); //funcion para decrementar el ESTADO
  const reset = () => setState(0); //funcion para resetear el ESTADO
  //5. retornamos los estados, funciones y cualquier otra cosa que queramos exponer del hook
  return {
    //ORDEN DE LOS RETORNOS POR CONVENCION
    //PRIMERO LAS PROPS O ESTADOS QUE PUEDEN CAMBIAR
    state,

    //SEGUNDO CALCULOS QUE SE HACEN EN EL MOMENTO POR EJEMPLO UN PORCENTAJE
    //no tenemos calculos en este caso
    //TERCERO LAS FUNCIONES O METODOS QUE MODIFICAN EL ESTADO o HACEN ALGO
    increment,
    decrement,
    reset,
    // no tenemos mas metodos en este caso
  };
  //6. exportamos el custom hook
};

//?Consejos
//1. Mantén los hooks simples y enfocados en una sola responsabilidad.
//2. Usa nombres descriptivos para los hooks y sus retornos.
//3. Documenta el propósito y uso del hook para facilitar su comprensión y mantenimiento.

//4. Evita efectos secundarios fuera de useEffect para mantener los hooks puros.
//5. Prueba los hooks de manera aislada para asegurar su correcto funcionamiento.
//6. Reutiliza hooks en lugar de copiar y pegar lógica entre componentes.
//7. Usa TypeScript para definir tipos y mejorar la seguridad del código.
//8. Sigue las convenciones de React para mantener la coherencia en el código.

//9. Usa varios useEffect en lugar de uno solo con mucha lógica para separar responsabilidades.
//10. Asegúrate de que los hooks no dependan de variables externas que puedan cambiar fuera del hook.
//11. Considera el rendimiento y evita cálculos innecesarios dentro del hook.
//12. Usa memoización (useMemo, useCallback) si es necesario para optimizar el rendimiento.
//13. Mantén el componente que usa el hook limpio y enfocado en la presentación.
//14. Revisa y actualiza los hooks regularmente para adaptarlos a cambios en la lógica o requisitos.
//15. Comparte hooks útiles con la comunidad para contribuir al ecosistema de React.
//16. Usa herramientas de análisis estático para detectar posibles problemas en los hooks.
//17. Sigue aprendiendo y mejorando tus habilidades en React y hooks para crear mejores aplicaciones.

// definr un custom hook

// function useHook_Name() {
//   return (
//     rerotnamos la informacion que queremos exponer
//   )
// }

// export default useHook;// export default useHook;

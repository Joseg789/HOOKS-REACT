import { useEffect, useState } from "react";

/**
 * useEffect en React: Explicación Completa
 *
 * useEffect es un hook de React que te permite realizar efectos secundarios en componentes funcionales.
 * Los efectos secundarios incluyen: llamadas a APIs, suscripciones, manipulación del DOM, timers, etc.
 *
 * Sintaxis básica:
 * useEffect(() => {
 *   // Código del efecto
 *   return () => {
 *     // Código de limpieza (opcional)
 *   };
 * }, [dependencias]);
 *
 * Parámetros:
 * 1. Una función que contiene el efecto. Puede retornar una función de limpieza.
 * 2. Un array de dependencias. El efecto se ejecuta cuando cambian estas dependencias.
 *
 * Ejemplo 1: Efecto que se ejecuta en cada render
 */

export const InfoUseEffect = () => {
  const [count, setCount] = useState(0);

  // Se ejecuta en cada render
  useEffect(() => {
    document.title = `Has hecho clic ${count} veces`;
  });

  // Se ejecuta solo una vez (comportamiento de componentDidMount)
  useEffect(() => {
    console.log("El componente se montó");
    return () => {
      console.log("El componente se desmontó");
    };
  }, []);

  // Se ejecuta cuando 'count' cambia
  useEffect(() => {
    console.log("El valor de count cambió:", count);
  }, [count]);

  return (
    <div>
      <h2>useEffect en React</h2>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};

/**
 * Puntos clave:
 * - El primer parámetro de useEffect es el efecto a ejecutar.
 * - El segundo parámetro (array de dependencias) controla cuándo se ejecuta el efecto:
 *   - Sin array: en cada render.
 *   - Array vacío: solo al montar/desmontar.
 *   - Con dependencias: cuando alguna cambia.
 * - La función de limpieza (return) se ejecuta antes de desmontar el componente o antes de ejecutar el efecto nuevamente.
 *
 * Buenas prácticas:
 * - Usa la función de limpieza para cancelar suscripciones, limpiar timers, etc.
 * - Coloca todas las variables usadas dentro del efecto en el array de dependencias.
 * - Evita efectos innecesarios para mejorar el rendimiento.
 *
 * Documentación oficial: https://react.dev/reference/react/useEffect
 */

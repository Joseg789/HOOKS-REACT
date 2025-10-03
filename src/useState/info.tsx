// import { useState } from "react";
/**
 * useState en React
 * =================
 *
 * useState es un Hook de React que permite añadir estado local a componentes funcionales.
 * es el estado que redibuja el componente cuando cambia. Es una forma de que los componentes "recuerden" información entre renderizados.
 *
 * Sintaxis básica:
 * ----------------
 *
 * import { useState } from 'react';
 *
 * const [state, setState] = useState(valorInicial);
 *
 * - state: el valor actual del estado.
 * - setState: función para actualizar el estado.
 * - valorInicial: el valor inicial del estado (puede ser cualquier tipo: string, number, boolean, array, object, etc).
 *
 * Ejemplo 1: Contador simple
 * --------------------------
 */

// // function Contador() {
//   const [contador, setContador] = useState(0);

//   return (
//     <div>
//       <p>Valor: {contador}</p>
//       <button onClick={() => setContador(contador + 1)}>Incrementar</button>
//       <button onClick={() => setContador(contador - 1)}>Decrementar</button>
//     </div>
//   );
// }

/**
 * Ejemplo 2: Estado con string
 * ----------------------------
 */

// function Saludo() {
//   const [nombre, setNombre] = useState("José");

//   return (
//     <div>
//       <p>Hola, {nombre}</p>
//       <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
//     </div>
//   );
// }

// /**
//  * Ejemplo 3: Estado con objeto
//  * ----------------------------
//  */

// function Usuario() {
//   const [usuario, setUsuario] = useState({ nombre: "", edad: 0 });

//   const actualizarNombre = (nuevoNombre: string) => {
//     setUsuario((prev) => ({ ...prev, nombre: nuevoNombre }));
//   };

//   return (
//     <div>
//       <input
//         value={usuario.nombre}
//         onChange={(e) => actualizarNombre(e.target.value)}
//         placeholder="Nombre"
//       />
//       <p>Edad: {usuario.edad}</p>
//     </div>
//   );
// }

/**
 * Conceptos clave:
 * ----------------
 * - Cada llamada a useState crea una pieza de estado independiente.
 * - El estado se mantiene entre renders.
 * - Al llamar a setState, el componente se vuelve a renderizar con el nuevo estado.
 * - Si el nuevo estado depende del anterior, usa la función de actualización: setState(prev => nuevoValor).
 * - Puedes usar useState varias veces en el mismo componente para manejar diferentes estados.
 *
 * Ejemplo avanzado: Estado dependiente del anterior
 * -------------------------------------------------
 */

// function ContadorSeguro() {
//   const [contador, setContador] = useState(0);

//   const incrementar = () => setContador((prev) => prev + 1);

//   return <button onClick={incrementar}>Contador: {contador}</button>;
// }

/**
 * Resumen:
 * --------
 * - useState es fundamental para manejar datos dinámicos en componentes funcionales.
 * - Recuerda importar useState desde 'react'.
 * - El estado puede ser de cualquier tipo.
 * - Actualiza el estado usando la función que retorna useState.
 */

import React, { useRef, useEffect } from "react";

// 1. Crear una referencia
// useRef puede almacenar cualquier valor mutable que persista entre renders
//es util para acceder a elementos DOM o para mantener valores que no causan re-render
//se usa para acceder a elementos del DOM directamente o para mantener valores mutables y persistentes
//ejemplos comunes son:
//- acceder a un input para enfocarlo o leer su valor
//- mantener un contador de renders
//- almacenar un valor previo de una prop o estado
//- guardar un temporizador o intervalo
//- evitar re-renders innecesarios
//- manejar animaciones
//- integrar con librerias de terceros que manipulan el DOM
//- almacenar valores que no afectan la UI
//etc.
//!importante: useRef no causa re-render cuando su valor cambia
// no es recomendable usar useRef para manejar estados que afectan la UI

//fc component MyComponent // es un functional component
//otra forma de definir un componente funcional en react
// const MyComponent = () => {
// return();
// }
const MyComponent: React.FC = () => {
  // useRef puede almacenar cualquier valor mutable
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<number>(0);

  // 2. Acceder al valor actual de la referencia
  useEffect(() => {
    // inputRef.current apunta al elemento DOM
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // countRef.current es un valor mutable que no causa render
    countRef.current += 1;
    console.log("Render count:", countRef.current);
  });

  // 3. Modificar el valor de la referencia
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "Texto cambiado!";
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Cambiar texto</button>
    </div>
  );
};

export default MyComponent;

/*
Sintaxis clave de useRef:
- const ref = useRef(valorInicial);
- ref.current para acceder/modificar el valor.
- No causa re-render al cambiar ref.current.
- Útil para acceder a elementos DOM o valores persistentes entre renders.
*/

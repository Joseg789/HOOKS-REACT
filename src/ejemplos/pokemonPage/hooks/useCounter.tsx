import { useState } from "react";
//creamos un custom hook para manejar el contador del pokemon PARA CAMBIAR DE POKEMON
function useCounter() {
  const [count, setCount] = useState(1); //iniciamos el contador en 1 porQUE EL PRIMER POKEMON ES ID 1
  //prevCount es el valor anterior de count
  //increment, decrement y reset son funciones que modifican el estado de count
  const increment = () => setCount((prevCount) => prevCount + 1); //suma 1 al valor anterior
  const decrement = () =>
    setCount((prevCount) => {
      if (prevCount === 1) return 1; //si el valor anterior es 1 no hacemos nada y regresamos 1 porque no hay pokemon con id 0 o negativo
      //SINO ES 1 DECREMENTAMOS
      return prevCount - 1; //resta 1 al valor Anterior
    });
  //   const reset = () => setCount(1); //resetea el contador a 1

  //retornamos el contador y las funciones para modificarlo
  return { count, increment, decrement };
}

export default useCounter;

import { useEffect, useState } from "react";
//!crea,mos un custom hook para manejar la logica del semaforo y asi mantener el componente limpio
//un custom hook es una funcion que usa hooks de react y puede tener su propia logica y estados

//definimos  las clases de los colores del semáforo usando las utilidades de Tailwind CSS
const colors = {
  red: "bg-red-500 animate-pulse ", //animate-pulse para que parpadee
  yellow: "bg-yellow-500 animate-pulse", //todas son clases de tailwindcss
  green: "bg-green-500 animate-pulse",
};
type LightColor = "red" | "yellow" | "green"; //definimos un type para los colores del semaforo para pasarlo a useState<LightColor>
//!  type Colors = keyof typeof colors; //type Colors = 'red' | 'yellow' | 'green' //otra forma de definir el type usando las llaves del objeto colors

export const useLight = () => {
  const [count, setCount] = useState(5); //el contador inicia en 5 segundos pueden ser mas o menos
  const [light, setLight] = useState<LightColor>("red"); //el estado inicial es 'red' pasamos el tpo en useState <>
  //!USEEEEFFECT para manejar el cambio del contador
  useEffect(() => {
    if (count === 0) return; //si el contador es menor que 0 no hacemos nada y regresamos porque no queremos que el contador siga disminuyendo
    //creamos un intervalo que se ejecuta cada segundo
    const interval = setInterval(() => {
      //disminuimos el contador cada segundo
      //usamos la funcion de actualizacion para asegurarnos de tener el valor mas reciente
      //c es el valor actual de count y devolvemos c - 1 para disminuirlo en 1
      setCount((c) => c - 1);
    }, 1000);
    //limpiamos el intervalo cuando el componente se desmonte o cuando count llegue a 0

    return () => clearInterval(interval);
  }, [count]);

  //!efecto para cambiar la luz cuando el contador llega a 0
  useEffect(() => {
    //!si el contador es mayor que 0 regresamos porque no queremos cambiar la luz
    if (count > 0) return;
    // y asi evitamos que se ejecute el resto del codigo del useEffect y es mas eficiente

    //!si el contador es 0 cambiamos la luz y reseteamos el contador a 5 segundos
    setCount(5); //reseteamos el contador a 5 segundos

    //!cambiamos la luz segun el estado actual de la luz (light)
    setLight((prev) =>
      //si la luz es roja pasa a verde, si es amarilla pasa a roja, si no pasa a amarilla porque esta la luz en verde
      prev === "red" ? "green" : prev === "yellow" ? "red" : "yellow"
    );
    //!comentarrios explicativos
    //usamos la funcion de actualizacion para asegurarnos de tener el valor mas reciente
    //prev es el valor actual de light y devolvemos el siguiente color segun el estado actual
    //el orden del semaforo es rojo -> verde -> amarillo -> rojo
    //asi se repite el ciclo del semaforo
    //count y light son las dependencias del useEffect porque cuando cambian queremos que se ejecute el efecto
  }, [count, light]);

  //!retornamos el contador, la luz actual y los colores para usarlos en el componente TrafficLightWithEffect
  return { count, light, colors };
};

//?Consejos
//es mejor tener varios useEffect que uno solo con mucha logica
//cada useEffect debe tener una responsabilidad unica

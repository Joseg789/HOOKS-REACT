import { useState } from "react";

// Componente TrafficLight que simula un semáforo
//definimos  las clases de los colores del semáforo usando las utilidades de Tailwind CSS
const colors = {
  red: "bg-red-500 animate-pulse ",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};
type LightColor = "red" | "yellow" | "green";
//!  type Colors = keyof typeof colors; //type Colors = 'red' | 'yellow' | 'green' //otra forma de definir el type usando las llaves del objeto colors

export const TrafficLight = () => {
  //tipado de useState para que solo acepte los valores 'red', 'yellow' o 'green'
  //   const [light, setLight] = useState<"red" | "yellow" | "green">("red");
  //es mas elegante definir un type para los colores y usarlo en el useState
  //tambien podriamos usar las llaves de un objeto como en colors
  //!const [light, setLight] = useState< Colors>("red");
  const [light, setLight] = useState<LightColor>("red"); //el estado inicial es 'red' pasamos el tpo en useState <>

  const handleClick = (color: LightColor) => {
    //tambien podriamos usar el valor anterior para cambiar al siguiente color
    // setLight((prev) => (prev === "red" ? "yellow" : prev === "yellow" ? "green" : "red"));
    //prev es el valor anterior de light o el estado anterior
    setLight(color);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <div
          className={`${
            light === "red" ? colors[light] : "bg-gray-500"
          } w-32 h-32 rounded-full`}
        ></div>
        <div
          className={`${
            light === "yellow" ? colors[light] : "bg-gray-500"
          } w-32 h-32 rounded-full`}
        ></div>
        <div
          className={`${
            light === "green" ? colors[light] : "bg-gray-500"
          } w-32 h-32 rounded-full`}
        ></div>

        {/* Botón para cambiar el estado de la luz */}
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleClick("red")}
          >
            Rojo
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleClick("yellow")}
          >
            Amarillo
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => handleClick("green")}
          >
            Verde
          </button>
        </div>
      </div>
    </div>
  );
};

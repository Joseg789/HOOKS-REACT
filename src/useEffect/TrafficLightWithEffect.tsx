import { useLight } from "./useLight";

// Componente TrafficLight que simula un semáforo
export const TrafficLightWithEffect = () => {
  //importamos el custom hook useLight
  const { count, light, colors } = useLight();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-10">
      <div className="flex flex-col items-center space-y-10">
        <h1 className=" text-3xl text-white font-thin p-2">
          Semaforo con UseEffect
        </h1>
        <h2 className=" text-xl text-white font-bold">{count}</h2>
        {/**barra de progreso */}
        <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
            style={{ width: `${(count / 5) * 100}%` }}
          ></div>
        </div>
        <div
          className={`${
            light === "red" ? colors[light] : "bg-gray-500"
          } w-32 h-32 rounded-full`}
        ></div>
        <div
          className={` w-32 h-32 rounded-full ${
            light === "yellow" ? colors[light] : "bg-gray-500"
          }`}
        ></div>
        <div
          className={`${
            light === "green" ? colors[light] : "bg-gray-500"
          } w-32 h-32 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

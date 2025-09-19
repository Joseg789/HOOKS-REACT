import { useLight } from "./useLight";

// Componente TrafficLight que simula un semáforo
export const TrafficLightWithEffect = () => {
  //importamos el custom hook useLight
  const { count, percentage, greenLight, redLight, yellowLight } = useLight();

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
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className={`${redLight} w-32 h-32 rounded-full`}></div>
        <div className={` w-32 h-32 rounded-full ${yellowLight}`}></div>
        <div className={`${greenLight} w-32 h-32 rounded-full`}></div>
      </div>
    </div>
  );
};

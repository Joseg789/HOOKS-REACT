import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import { TrafficLight } from './useState/TrafficLight';
// import { TrafficLightWithEffect } from "./useEffect/TrafficLightWithEffect";
import { PokemonPage } from "./ejemplos/pokemonPage/PokemonPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {
      /**comentarios explicativos */
      //! los componentes que  comentados son ejemplos previos puedes descomentarlos para ver su funcionamiento
    }
    {/* app es holamundo */}
    {/* <App /> */}
    {/* TrafficLight ES PARA EL EJEMPLO DE useState */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> ES PARA EL EJEMPLO DE useEffect Y CUSTOM HOOKS */}

    {/* <TrafficLightWithEffect /> */}

    <PokemonPage />
  </StrictMode>
);

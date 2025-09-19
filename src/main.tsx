import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import { TrafficLight } from "./useState/TrafficLight";
import { TrafficLightWithEffect } from "./useEffect/TrafficLightWithEffect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <TrafficLight /> */}
    <TrafficLightWithEffect />
  </StrictMode>
);

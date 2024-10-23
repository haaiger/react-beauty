import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shared/css/reset.css";
import "@shared/css/index.css";
import Application from "./Application";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Application />
  </StrictMode>
);

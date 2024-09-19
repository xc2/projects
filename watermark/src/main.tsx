import "./globals.css";
import "./main.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>
);

import "./globals.css";
import "./main.css";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>,
);

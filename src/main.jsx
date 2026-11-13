/**
 * Entry point: mounts the React app into the #root element in index.html.
 * StrictMode runs extra checks during development only, not on the live site.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

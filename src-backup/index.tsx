import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// --- CRASH REPORTER START ---
window.onerror = function (message, source, lineno, colno, error) {
  const div = document.createElement("div");
  div.style.cssText =
    "position:fixed; top:0; left:0; width:100vw; height:100vh; background:white; color:red; z-index:99999; padding:20px; font-size:18px; font-family:monospace; overflow:auto;";
  div.innerHTML = `
    <h1 style="font-size:30px; margin-bottom:10px;">⚠️ CRASH DETECTED</h1>
    <p><b>Error:</b> ${message}</p>
    <p><b>File:</b> ${source}</p>
    <p><b>Line Number:</b> ${lineno}</p>
  `;
  document.body.appendChild(div);
  return false;
};
// --- CRASH REPORTER END ---

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

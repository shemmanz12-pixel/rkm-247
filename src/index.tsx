import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// --- CRASH REPORTER (Safe for Production) ---
window.onerror = function (message, source, _lineno, _colno, error) {
  // Only show the red crash screen in local development mode
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    const div = document.createElement("div");
    div.style.cssText =
      "position:fixed; top:0; left:0; width:100vw; height:100vh; background:white; color:red; z-index:99999; padding:20px; font-size:18px; font-family:monospace; overflow:auto;";
    div.innerHTML = `
      <h1 style="font-size:30px; margin-bottom:10px;">⚠️ CRASH DETECTED</h1>
      <p><b>Error:</b> ${message}</p>
      <p><b>File:</b> ${source}</p>
      <p><b>Error Object:</b> ${JSON.stringify(error)}</p>
    `;
    document.body.appendChild(div);
  } else {
    // In production, log silently so it doesn't disrupt the user experience
    console.error("Caught by global handler:", message, error);
  }
  return false;
};

const rootElement = document.getElementById("root") as HTMLElement;

/**
 * FIXED: Reverted to standard createRoot.
 * This eliminates the "Minified React error #418" because we are no longer 
 * trying to hydrate static HTML that might not match the JavaScript.
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
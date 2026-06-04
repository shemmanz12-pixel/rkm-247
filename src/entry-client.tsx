import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { ServerContext } from "./context/ServerContext";
import ErrorBoundary from "./components/ErrorBoundary"; // Make sure path matches your screenshot

// Remove the old window.onerror interceptor entirely so it doesn't suppress runtime execution state errors.
// Our new React ErrorBoundary will catch and display everything perfectly!

const rootElement = document.getElementById("root") as HTMLElement;

// Using hydrateRoot ensures the React client-side engine hooks seamlessly 
// into your 262 prerendered HTML nodes without wiping them away.
const root = ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <ErrorBoundary>
      <ServerContext.Provider value={false}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ServerContext.Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
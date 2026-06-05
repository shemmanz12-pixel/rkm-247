import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { ServerContext } from "./context/ServerContext";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* ADDED: Explicitly tell local dev mode that it is running on the client side */}
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
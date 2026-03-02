import React from "react";
import { ViteSSG } from "vite-plugin-ssg";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ssgRoutes } from "./ssg-routes";

export const createApp = ViteSSG(
  App,
  { routes: ssgRoutes },
  ({ app }) => {
    // Wrap with HelmetProvider (keeps your Helmet working)
    app.use(() => (
      <HelmetProvider>
        {app}
      </HelmetProvider>
    ));
  }
);

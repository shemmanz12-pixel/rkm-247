import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ServerContext } from './context/ServerContext';

interface RenderResult {
  html: string;
  helmet: any;
}

export function render(url: string, _context: any): RenderResult {
  const helmetContext: any = {};

  const app = (
    <ServerContext.Provider value={true}>
      <StaticRouter location={url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </ServerContext.Provider>
  );

  const html = ReactDOMServer.renderToString(app);

  return {
    html,
    helmet: helmetContext.helmet || null,
  };
}

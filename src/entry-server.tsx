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

  let normalizedUrl = url;
  
  if (!normalizedUrl.startsWith('/')) {
    normalizedUrl = '/' + normalizedUrl;
  }
  
  if (normalizedUrl !== '/' && normalizedUrl.endsWith('/')) {
    normalizedUrl = normalizedUrl.slice(0, -1);
  }

  // FIXED: If the incoming pre-render path is a single town segment (e.g., "/coalville"),
  // automatically format it to match React Router's expected double-segment service layout ("/emergency-plumber/coalville")
  const segments = normalizedUrl.split('/').filter(Boolean);
  if (segments.length === 1 && segments[0] !== 'about' && segments[0] !== 'reviews' && segments[0] !== 'services' && segments[0] !== 'locations' && segments[0] !== 'faq' && segments[0] !== 'privacy-policy') {
    normalizedUrl = `/emergency-plumber/${segments[0]}`;
  }

  const app = (
    <ServerContext.Provider value={true}>
      <StaticRouter location={normalizedUrl}>
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
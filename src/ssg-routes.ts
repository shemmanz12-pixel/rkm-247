import { serviceContent } from './serviceData.js';
import { towns } from './townConfig.js';

const services: string[] = Object.keys(serviceContent);
const areas: string[] = Object.keys(towns);

const routes: string[] = ['/'];

services.forEach((service: string) => {
    routes.push(`/${service}`);
});

areas.forEach((area: string) => {
    routes.push(`/plumber-in-${area}`);
});

services.forEach((service: string) => {
    areas.forEach((area: string) => {
        routes.push(`/${service}/in-${area}`);
    });
});

// Add other static routes if any
// e.g. routes.push('/about', '/contact');

export default routes;

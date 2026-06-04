import { serviceContent } from './data/serviceData'; 
import { towns } from './townConfig'; // Corrected path to src folder

const services = Object.keys(serviceContent);
const areas = Object.keys(towns);

const routes: string[] = [
    '/',
    '/about',
    '/reviews',
    '/services',
    '/locations',
    '/faq',
    '/privacy-policy'
];

services.forEach((service) => {
    routes.push(`/${service}`);
    areas.forEach((area) => {
        // Generates clean paths like /local-plumber/ashby-de-la-zouch
        // No "in-" prefix ensures townKey matches towns[area]
        routes.push(`/${service}/${area}`);
    });
});

export default routes;
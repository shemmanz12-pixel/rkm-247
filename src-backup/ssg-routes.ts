import { locations } from "./data/locations";

export const ssgRoutes = [
  "/",
  "/locations",
  ...locations.map(l => `/location/${l.slug}`)
];

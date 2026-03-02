import { createContext, useContext } from 'react';

export const ServerContext = createContext(false);

export const useIsServer = () => useContext(ServerContext);

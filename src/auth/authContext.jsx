import {createContext} from "react";

/**
 * Contexto de autenticação global.
 * Mantém o estado do usuário logado e se ele está autenticado.
 * **/
export const AuthContext = createContext({
  isAuthenticated: false,
  loggedUser: null,
  login: async (token, user) => {},
  logout: () => {},
});
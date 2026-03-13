import {createContext, useContext, useEffect, useState} from "react";
import {LocalStorageService} from "@/app/service/localStorageService.js";

// AuthContext ( centro da autenticação )

const storageLocal = LocalStorageService();
export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const USER_TOKEN = "_usuario_logado";
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = storageLocal.obterItem( USER_TOKEN );
    if ( USER_TOKEN ) {
      setIsAuthenticated(true);
    }
  }, [])

  function login( token ) { //recebe um token
    storageLocal.salvarItem( USER_TOKEN, token);
    setIsAuthenticated(true);
  }

  function logout() {
    storageLocal.removerItem( USER_TOKEN );
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout  }}>
      { children }
    </AuthContext.Provider>
  );
}
import {createContext, useContext} from "react";

/**iniciando a criacao do contexto**/
export const AuthContext = createContext({
  isAuthenticated: false,
  login: async (token, user) => {},
  logout: () => {},
});

/**para o consumo do context**/
export const UseConsumer = AuthContext.useContext;
/**provedor do context**/
const AuthProvider = AuthContex.Provider;

export const provedorAutenticacao = () => {
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
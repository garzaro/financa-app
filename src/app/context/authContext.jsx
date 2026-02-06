import {createContext, useState, useContext, useEffect} from "react";
import {LocalStorageService} from "../service/localStorageService.js";
import {authService, TOKEN_KEY, validateToken} from "../service/authService.js";
import {getToken} from "../service/authService.js";


const AuthContext = createContext(null);

const localStorage = LocalStorageService;

/****/
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**para verificar se tem token no localStorage quando a aplicação carrega**/
  useEffect(() => {
    /**funcao criada porque useffect nao pode ser async**/
    const authentication = async () => {
      const token = await authService.getToken();
      if (token) {
        /**validando o token**/
        const userData = await authService.validateToken(token);
        if (userData) {
          /**se API retorna o usuario, guarda os dados reais dele**/
          setUser(userData);
        }else {
          authService.logout();
          setUser(null);
        }
      }
      setLoading (false);
    };
    authentication();
  }, []); //CONTINUAR COM O AUTH, VER SITE ROCKETSEAT E AULA DOUGLLAS
  return(
    // {!loading && children}
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};


import {LocalStorageService} from "./localStorageService.js";
//import {api} from "../api/apiservice.js";

/**serviçoo**/
const storageLocal = LocalStorageService();
//const url = api();

/**TOKEN_KEY chave usada para salvar o JWT no localStorage**/
export const TOKEN_KEY = import.meta.env.VITE_API_AUTH_TOKEN_KEY;
const LOGGED_USER = '_usuario_logado';

/**
 * servico de autenticao
 * **/
export const AuthService = () => {
  return{
    /**verificar se ja existe uma chave/token no localStorage (usuario logado la) retorna V ou F**/
    isAuthenticated: () => {
      const usuario = storageLocal.obterItem( LOGGED_USER );
      return usuario && usuario.id; //!!usuario && !!usuario.id; ou sem !! ()
    },
    removeAuthenticatedUser: () => {
      storageLocal.removerItem( LOGGED_USER );
    },
    /**pegando o token do localStorage - retorna nulo se nao houver**/
    getToken: () =>{
      storageLocal.obterItem(TOKEN_KEY);
    },
    /**salvar o token no armazenamento local**/
    login: (token) =>{
      storageLocal.salvarItem(TOKEN_KEY, token);
    },
  }
}


// validateToken: (token) =>{
//   try {
//     const response = await fetch(`${url}/usuario`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       }
//       });
//     if (!response.ok) throw new Error(response.statusText, "Token inválido");
//     /**retorna os dados do usuario**/
//     return await response.json();
//   }
//   catch(err){
//     return null;
//   }
// }
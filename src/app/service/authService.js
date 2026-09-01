import {LocalStorageService} from "./localStorageService.js";
//import {api} from "../api/apiservice.js";

/**
 * Unica responsabilidade ler/escrever/remover dados de autenticação
 * 
 * O localStorage ainda pode guardar apenas dados não sensíveis, como
 *  o objeto do usuário para exibição. No estado atual, ele também 
 * continua sendo limpo no logout e o authService.js preserva métodos 
 * antigos de token por compatibilidade, mas o novo fluxo não deve chamar
 *  auth.login(token) nem usar getToken() para autenticar requisições.
 * **/

/**serviçoo**/
const storageLocal = LocalStorageService();
//const url = api();

/**
 * TOKEN_KEY chave usada para salvar o JWT no localStorage
 * **/
export const TOKEN_KEY = import.meta.env.VITE_API_AUTH_TOKEN_KEY;
export const LOGGED_USER_KEY = '_usuario_logado';

/**
 * servico de autenticao
 * **/
export const AuthService = () => {
  return {
    /**
     * @returns true - se o token JWT existir
     * **/
    isAuthenticated: () => {
      const token = storageLocal.obterItem( TOKEN_KEY );
      return !!token;
    },

    /**
     * @param {string} token - salvar o token JWT no armazenamento local
     * **/
    login: ( token ) => {
      storageLocal.salvarItem( TOKEN_KEY, token );
    },

    /**
     * Remove o token e o usuário do armazenamento local
     * **/
    logout: () => {
      storageLocal.removerItem( TOKEN_KEY );
      storageLocal.removerItem( LOGGED_USER_KEY );
    },

    /**
     * @returns {string|null} o token JWT
     * **/
    getToken: () => storageLocal.obterItem( TOKEN_KEY ),

    /**
     * @returns {object|null} o usuario logado
     * **/
    getLoggedUser: () => storageLocal.obterItem( LOGGED_USER_KEY ),

    /**
     * @param {object} user - salva o usuario logado no localStorage
     * **/
    saveLoggedUser: ( user ) => storageLocal.salvarItem( LOGGED_USER_KEY, user ),

    /**
     * Remove apenas o usuário logado
     * **/
    removeAuthenticatedUser: () => {
      storageLocal.removerItem( LOGGED_USER_KEY );
    },
  }
}
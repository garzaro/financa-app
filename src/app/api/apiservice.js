import axios from "axios";

/**
 * passando configurações para o axios
 * Configuração do cliente HTTP usando variáveis de ambiente
 *
 * harcoded
 * export const httpClient = axios.create({
 *     baseURL: 'http://localhost:8080/',
 *     withCredentials: true
 * });
 * */

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    /**
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || 10000, 10),
     * anotar
     * */
    withCredentials: true
});

/**
 * responsável por fazer requisições para toda a api
 *
 * factory funtion const ApiService = (apiurl) => {}
 * */
const ApiService = (apiurl) => {
    return {
        apiurl: apiurl,
        /**
         * metodos
         */
        post: (url, objeto) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.post(requestUrl, objeto);
        },
        put: (url, objeto) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.put(requestUrl, objeto);
        },
        delete:(url) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.delete(requestUrl);
        },
        get: (url) => {
            const requestUrl = `${apiurl}${url}`;
            return httpClient.get(requestUrl);
        },
    }
  }
  export default ApiService;

/**
  put: async (url, objeto) => {
  const requestUrl = `${apiurl}${url}`;
  const response = await httpClient.put(requestUrl, objeto);
  return response.data;
  },
 **/

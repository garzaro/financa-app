import axios from "axios";
// import {getToken} from "../service/authService.js";

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

/**httpClient**/
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  /**
   timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || 10000, 10),
   * anotar
   * */
  withCredentials: true
});

// /**Interceptor de requisições: adiciona o toke JWT ao header Authorization, se existir mano**/
// api.interceptors.request.use((config) => {
//   const token = getToken();
//   if ( token ) {
//     config.headers.Authorization = `Bearer ${ token }`;
//   }
//   return config;
// })

/**
 * responsável por fazer requisições para toda a api
 * ${apiurl}${url} = server/url
 * factory funtion const Apiservice = (apiurl) => {}
 *
 * @param Apiservice - recebe a prop (apiurl), a url que recebe uma api
 * @return url - recebe a url do backend - Controller
 * */

const Apiservice = (apiurl) => {
  return {
    //apiurl: apiurl,
    /**
     * metodos
     */
    post: (url, objeto) => {
      const requestUrl = `${apiurl}${url}`;
      return api.post(requestUrl, objeto);
    },
    put: (url, objeto) => {
      const requestUrl = `${apiurl}${url}`;
      return api.put(requestUrl, objeto);
    },
    delete:(url) => {
      const requestUrl = `${apiurl}${url}`;
      return api.delete(requestUrl);
    },
    get: (url) => {
      const requestUrl = `${apiurl}${url}`;
      return api.get(requestUrl);
    },
  }
}
export default Apiservice;


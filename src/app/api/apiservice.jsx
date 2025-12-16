import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

const httpClient = axios.create({
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

/**
 * responsável por fazer requisições para toda a api
 * ${apiurl}${url} = server/url
 * factory funtion const ApiService = (apiurl) => {}
 *
 * @param ApiService - recebe a prop (apiurl), a url que recebe uma api
 * @return url - recebe a url do backend - Controller
 * */

const ApiService = (apiurl) => {
  return {
    //apiurl: apiurl,
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


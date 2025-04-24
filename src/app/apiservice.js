import axios from "axios";

/*passando configurações para o exios*/
export const httpClient = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true
})
/*responsável por fazer requisições para toda a api*/
const ApiService = (apiurl) => {
    return {
        apiurl: apiurl,
        /*metodos*/
        post: async (url, objeto) => {
            const requestUrl = `${apiurl}${url}}`;
            const response = await httpClient.post(requestUrl, objeto);
            return response.data;
        },
        put: async (url, objeto) => {
            const requestUrl = `${apiurl}${url}}`;
            const response = await httpClient.put(requestUrl, objeto);
            return response.data;
        },
        delete: async (url) => {
            const requestUrl = `${apiurl}${url}}`;
            const response = await httpClient.delete(requestUrl);
            return response.data;
        },
        get: async (url) => {
            const requestUrl = `${apiurl}${url}}`;
            const response = await httpClient.get(requestUrl);
            return response.data;
        },
    }
}
export default ApiService;


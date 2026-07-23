import Apiservice from "../api/apiservice.js";
/**
 * tratando da api de serviços do usuario -
 * sobrescrevendo para utilização dos metodos da apiService
 *
 * @param ApiService - importada, (composiçao, pensar em extends) - React 16+
 *
 * @returns credencials - recebe como objeto as credenciais do usuario
 * */

const usuarioApi = Apiservice('/api/auth');

const ServiceUsuario = (credentials) =>{
  return{
    autenticar: (credentials) => {
      return usuarioApi.post('/sign-in', credentials);
    },

    salvar: (usuario) => {
      return usuarioApi.post('/join/sign-up', usuario);
    },

    buscarSaldoPorUsuario: (id) => {
      return usuarioApi.get(`/${id}/saldo`); {/**template string ``*/}
    },
  };
};
export default ServiceUsuario;
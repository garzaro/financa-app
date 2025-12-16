import Apiservice from "../api/apiservice.jsx";
/**
 * tratando da api de serviços do usuario -
 * sobrescrevendo para utilização dos metodos da apiService
 *
 * @param ApiService - importada, (composiçao, pensar em extends) - React 16+
 *
 * @returns credencials - recebe como objeto as credenciais do usuario
 * */

const usuarioApi = Apiservice('/api/usuarios');

const ServiceUsuario = (credentials) =>{
  return{
    autenticar: (credentials) => {
      return usuarioApi.post('/autenticar', credentials);
    },
    buscarSaldoPorUsuario: (id) => {
      return usuarioApi.get(`/${id}/saldo`); {/**template string ``*/}
    },
    salvar: (usuarios) => {
      return usuarioApi.post('', usuarios);
    }
  };
  // outros métodos futuros:
  // cadastrar: (dados) => usuarioApi.post('/cadastrar', dados),
  // buscarPorId: (id) => usuarioApi.get(`/${id}`),
};
export default ServiceUsuario;
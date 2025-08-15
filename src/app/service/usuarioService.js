import Apiservice from "../api/apiservice";
/**
 * tratando da api de serviços do usuario -
 * sobrescrevendo para utilização dos metodos da apiService
 *
 * instanciando ApiService - composiçao - React 16+
 * */

const usuarioApi = Apiservice('/api/usuarios');

const ServiceUsuario = (credentials) =>{
    return{
        autenticar: (credentials) => {
            return usuarioApi.post('/autenticar', credentials);
    },
        buscarSaldoPorUsuario: (id) => {
            return usuarioApi.get(`/${id}/saldo`);
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
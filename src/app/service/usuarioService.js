import Apiservice from "../apiservice";
/*tratando da api de serviços do usuario - sobrescrevendo para utilização dos metodos da apiService*/
/*instanciando ApiService - composiçao*/

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = (credentials) =>{
    return{
        autenticar: (credentials) => {
            return usuarioApi.post('autenticar', credentials);
    },
        buscarSaldoPorUsuario: (id) => {
            return usuarioApi.get('${id}/saldo');
    },
        salvarUsuario: (usuarios) => {
            return usuarioApi.post('/', usuarios);
    }
};
    // outros métodos futuros:
    // cadastrar: (dados) => usuarioApi.post('/cadastrar', dados),
    // buscarPorId: (id) => usuarioApi.get(`/${id}`),
};

export default ServiceUsuario;
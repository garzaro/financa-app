import Apiservice from "../apiservice";
/*tratando da api de serviços do usuario - sobrescrevendo para utilização dos metodos da apiService*/
/*instanciando ApiService - composiçao*/

const usuarioApi = Apiservice('/api/usuarios/');

const ServiceUsuario = () =>{
    return{
        autenticar: (credenciais) => {
            return usuarioApi.post('autenticar', credenciais);
    },
        buscarSaldoPorUsuario: (id) => {
            return usuarioApi.get(`${id}/saldo`);
        }
};
    // outros métodos futuros:
    // cadastrar: (dados) => usuarioApi.post('/cadastrar', dados),
    // buscarPorId: (id) => usuarioApi.get(`/${id}`),
};

export default ServiceUsuario;
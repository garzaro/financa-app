import Apiservice from "../apiservice";
/*tratando da api de serviços do usuario - sobrescrevendo para utilização dos metodos da apiService*/
/*instanciando ApiService - composiçao*/

const usuarioApi = Apiservice('/api/usuarios');

const UsuarioService = {
    autenticar: (credenciais) => {
        return Apiservice.post('/autenticar', credenciais);
    },
    // outros métodos futuros:
    // cadastrar: (dados) => usuarioApi.post('/cadastrar', dados),
    // buscarPorId: (id) => usuarioApi.get(`/${id}`),
};

export default UsuarioService;
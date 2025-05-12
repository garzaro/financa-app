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
    },
        salvarUsuario: (usuario) => {
            return usuarioApi.post(`/`, usuario);
    }
};
    // outros métodos futuros:
    // cadastrar: (dados) => usuarioApi.post('/cadastrar', dados),
    // buscarPorId: (id) => usuarioApi.get(`/${id}`),
};

export default ServiceUsuario;

/*
* const buscarSaldoPorUsuario = async () => {
    try {
        const response = await usuarioApi.get('/saldo'); // Chama o metodo get
        console.log(response.data); // Lida com a resposta
    } catch (error) {
        console.error('Erro ao buscar saldo:', error);
    }
};*/
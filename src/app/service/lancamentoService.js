import ApiService from '../services/api';

const lancamentoApi = ApiService('api/lancamentos');

const ServiceLancamento = (credentials) =>{
    return{
        autenticar: (credentials) => {
            return usuarioApi.post('/autenticar', credentials);
        },
        buscarSaldoPorUsuario: (id) => {
            return usuarioApi.get('/${id}/saldo');
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
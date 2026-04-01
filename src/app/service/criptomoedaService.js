import Apiservice from '../api/apiservice.js';

const criptomoedaApi = Apiservice('/api/criptomoeda');

const ServiceCriptomoeda = () => {
  return {
    /**
     * Lista criptomoedas do usuário (mesmo padrão de consulta de lançamentos).
     * @param {number|string} usuarioId
     */
    listarPorUsuario: (usuarioId) => {
      const params = new URLSearchParams();
      if (usuarioId !== undefined && usuarioId !== null && usuarioId !== '') {
        params.append('usuario', usuarioId);
      }
      const query = params.toString();
      return criptomoedaApi.get(query ? `?${query}` : '');
    },

    salvarCriptoMoeda: (criptomoeda) => {
      return criptomoedaApi.post('', criptomoeda);
    },

    deletarCriptoMoeda: (id) => {
      return criptomoedaApi.delete(`/${id}`);
    },

    /** usando para atualização ou criação **/
    obterCriptoMoedaPorId: (id) => {
      return criptomoedaApi.put(`/${id}`);
    },

    atualizarCriptoMoeda: (id, criptoMoeda) => {
      return criptomoedaApi.put(`/${id}`, criptoMoeda);
    },

    alterarStatus: (id, statusCriptoMoeda) => {
      return criptomoedaApi.put(`/${id}/atualizar-statusCriptoMoeda`,
        { statusCriptoMoeda }
      );
    }

    /**desestruturação**/
    // consultarLancamento: ({ ano, mes, tipoLancamento, usuario }) => {
    //   // construir string de consulta somente com filtros fornecidos
    //   let params = new URLSearchParams();
    //   if (ano !== undefined && ano !== null && ano !== '') params.append('ano', ano);
    //   if (mes !== undefined && mes !== null && mes !== '') params.append('mes', mes);
    //   if (tipoLancamento !== undefined && tipoLancamento !== null && tipoLancamento !== '')
    //     params.append('tipoLancamento', tipoLancamento);
    //   if (usuario) params.append('usuario', usuario);
    //   /**
    //    * Converte o objeto URLSearchParams em uma string de consulta
    //    * formatada corretamente, como ano=2024&mes=10.
    //    * **/
    //   const query = params.toString();
    //   /**
    //    * verificar se a string está vazia
    //    * senao tiver será ?ano=...&mes=....
    //    * **/
    //   const url = query ? `?${query}` : '';
    //   /**
    //    * anexar a string da url que foi construida
    //    * **/
    //   return lancamentoApi.get(`${url}`);
    // },

  };
};

export default ServiceCriptomoeda;

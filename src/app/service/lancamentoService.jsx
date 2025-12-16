import ApiService from '../api/apiservice.jsx';
import {schemaLancamento} from "../../pages/lancamentos/schemaLancamento.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
/**
 * Anotações
 *
 * [x] Construir a url da requisicao para busca de lancamentos
 * [] url para filtrar por descrição
 *
 * URLSearchParams()
 * Garante a formatação correta: Cuida da codificação dos caracteres especiais automaticamente.
 * Evita erros: É menos propenso a erros de digitação, como esquecer um & ou ?
 * **/

/**Base path for lancamentos API**/
const lancamentoApi = ApiService('/api/lancamento');

const ServiceLancamento = () => {
  return {
    salvarLancamento: (lancamento) => {
      return lancamentoApi.post('', lancamento);
    },

    deletarLancamento: (id) => {
      return lancamentoApi.delete(`/${id}`);
    },
    /**usando para atualização ou criação**/
    obterLancamentoPorId: (id) => {
      return lancamentoApi.get(`/${id}`);
    },

    atualizarLancamento: (id, lancamento) => {
      return lancamentoApi.put(`/${id}`, lancamento);
    },

    /**desestruturação**/
    consultarLancamento: ({ ano, mes, tipoLancamento, usuario }) => {
      // construir string de consulta somente com filtros fornecidos
      let params = new URLSearchParams();
      if (ano !== undefined && ano !== null && ano !== '') params.append('ano', ano);
      if (mes !== undefined && mes !== null && mes !== '') params.append('mes', mes);
      if (tipoLancamento !== undefined && tipoLancamento !== null && tipoLancamento !== '')
        params.append('tipoLancamento', tipoLancamento);
      if (usuario) params.append('usuario', usuario);
      /**
       * Converte o objeto URLSearchParams em uma string de consulta
       * formatada corretamente, como ano=2024&mes=10.
       * **/
      const query = params.toString();
      /**
       * verificar se a string está vazia
       * senao tiver será ?ano=...&mes=....
       * **/
      const url = query ? `?${query}` : '';
      /**
       * anexar a string da url que foi construida
       * **/
      return lancamentoApi.get(`${url}`);
    },
  };
};
export default ServiceLancamento;



/**
 * contrução do url de forma manual
 * **/

// consultar: ( LancamentoFiltro ) => {
//
//     let params = `?ano=${LancamentoFiltro.ano}`
//     if (LancamentoFiltro.mes){
//         params = `${params}&mes=${LancamentoFiltro.mes}`
//     }
//     if (LancamentoFiltro.tipoLancamento){
//         params = `${params}&tipoLancamento=${LancamentoFiltro.tipoLancamento}`
//     }
//     if (LancamentoFiltro.status){
//         params = `${params}&statusLancamento=${LancamentoFiltro.statusLancamento}`
//     }
//     if (LancamentoFiltro.usuario){
//         params = `${params}&usuario=${LancamentoFiltro.usuario}`
//     }
//     return lancamentoApi.get(params);
// }
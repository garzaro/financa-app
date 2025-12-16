import toastr from 'toastr'
import {toast} from "react-toastify";

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "2000",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function mostrarMensagem(titulo, mensagem, tipo) {
  toastr[tipo](mensagem, titulo);
}
export function mensagemDeErro(mensagem) {
  mostrarMensagem('Erro! ', mensagem, 'error');
}
export function mensagemDeErroCadastro(mensagem) {
  mostrarMensagem('Erro! ', mensagem, 'error');
}
export function mensagemDeSucesso(mensagem) {
  mostrarMensagem('Sucesso!', mensagem, 'success');
}
export function mensagemDeAlerta(mensagem) {
  mostrarMensagem('Alerta!', mensagem, 'warning');
}

/**Consulta lançamento**/
export function errorConsultarLancamento(mensagem){
  mostrarMensagem('Mensagem', mensagem, 'error');
}
/**
 * módulo Handlers reutilizável para exibição de toastr
 * mapear e tratar erros conhecidos (400, 401, 403 etc.)
 *
 **/
export const toastErrorHandlers = new Map([
  [400, (msg) => toast.error(msg || 'Requisição inválida.')],
  [401, (msg) => {
    toast.warn('Sua sessão expirou. Faça login novamente.');
    localStorage.removeItem('token_acesso');
    //navigate('/login');
    window.location.href="/login";
  }],
  [403, (msg) => toast.error('Você não tem permissão para essa ação.')],
  [404, (msg) => toast.info('Recurso não encontrado.')],
  [500, (msg) => toast.error('Erro interno no servidor.')],
]);



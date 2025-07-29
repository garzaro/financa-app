import toastr from 'toastr'

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
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
    mostrarMensagem('Erro ao fazer login! ', mensagem, 'error');
}
export function mensagemDeErroCadastro(mensagem) {
    mostrarMensagem('Erro ao cadastrar usuario! ', mensagem, 'error');
}
export function mensagemDeSucesso(mensagem) {
    mostrarMensagem('Sucesso', mensagem, 'success');
}
export function mensagemDeAlerta(mensagem) {
    mostrarMensagem('Alerta', mensagem, 'warning');
}

/**
 * módulo Handlers reutilizável para exibição de toastr
 *
 **/
export const toastErrorHandlers = new Map([
    [400, (msg) => toast.error(msg || 'Requisição inválida.')],
    [401, (msg) => {
        toast.warn('Sua sessão expirou. Faça login novamente.');
        localStorage.removeItem('token_acesso');
        navigate('/login');
    }],
    [403, (msg) => toast.error('Você não tem permissão para essa ação.')],
    [404, (msg) => toast.info('Recurso não encontrado.')],
    [500, (msg) => toast.error('Erro interno no servidor.')],
]);




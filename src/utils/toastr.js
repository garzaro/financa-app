import toastr from 'toastr'

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
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

export function mensagens(titulo, mensagem, tipo) {
    toastr[tipo](mensagem, titulo);
}
export function mensagemDeErro(mensagem) {
    mensagens('Erro ao fazer login! ', mensagem, 'error');
}
export function mensagemDeErroCadastro(mensagem) {
    mensagens('Erro de cadastro', mensagem, 'warning');
}
export function mensagemDeSucesso(mensagem) {
    mensagens('Sucesso', mensagem, 'success');
}
export function mensagemDeAlerta(mensagem) {
    mensagens('Alerta', mensagem, 'warning');
}
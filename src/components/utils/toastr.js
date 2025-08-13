import toastr from 'toastr'

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "2500",
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


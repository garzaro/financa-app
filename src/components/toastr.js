import toastr from 'toastr'

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
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

export function mostrarMensagemDeErro(titulo, mensagem, tipo) {
    toastr[tipo](mensagem, titulo);
}
export function mensagemDeErro(mensagem) {
    mostrarMensagemDeErro('Erro ao fazer login! ', mensagem, 'error');
}
export function mensagemDeSucesso(mensagem) {
    mostrarMensagemDeErro('Sucesso', mensagem, 'success');
}
export function mensagemDeAlert(mensagem) {
    mostrarMensagemDeErro('Alerta', mensagem, 'warning');
}


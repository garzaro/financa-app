/*mascara cpf*/
export const handleCpfChange = (valor) => {
    /*remove os pontos na base de dados*/
    valor = valor.replace(/\D/g, '');
    /*11 digitos*/
    valor = valor.slice(0, 11);
    /*primeiro ponto*/
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    /*segundo ponto*/
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    /*hifen*/
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    /*define o valor no useForm*/
    return valor;
    /*console.log('mudou', valor)*/
};
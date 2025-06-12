/*mascara cpf*/
import {Chip} from "@mui/material";
import * as React from "react";

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
/*trim nos inputs de cadastro*/
export const validateSenhaTrim = (value) =>{
    if (value.includes(' ')) {
        return "A senha não pode conter espaços";
    }
    return true;
}
export const validarTrim = (value) =>{
    if (value.includes(' ')) {
        return "O campo não pode pode conter espaços";
    }
    return true;
}

/*estilização do status
*
* Renderiza um Chip estilizado para status
* @param {string} value - Valor do status
* @param {object} options - Opções adicionais
* @param {object} options.sx - Estilos adicionais
* @returns {JSX.Element} Componente Chip estilizado
*/
export const statusColorChip = (value, options = {}) => {
    if (!value) return null;

   // const status = String(params.value).toUpperCase();
    /*map de cores*/
    const {
        variant = 'outlined',
        colorMap = {
            'EFETIVADO': 'success',
            'PENDENTE': 'warning',
            'CANCELADO': 'error',
        },
        sx = {}
    } = options;
    /* ou a cor ou nada*/
    const status = String(value).toUpperCase();
    const chipColor = colorMap[status] || 'default';
    return (
        <Chip
            label={status}
            variant={variant}
            color={chipColor}
            sx={{
                fontWeight: 'bold',
                minWidth: 100,
                ...sx
            }}
        />
    );
}
/*erros de response da api*/
export const handleApiError = (
    error,
    mensagemPadrao = "Erro inesperado. Tente novamente mais tarde.",
    options = { log: false, console: console }
) => {
    let mensagemErro = mensagemPadrao;
    let detalhesDoErro = null;

    if (!error.response) {
        mensagemErro = "Falha na conexão. Verifique sua rede e tente novamente.";
        detalhesDoErro = error.message || 'Erro de rede';
    }
    else if (error.response.data) {
        mensagemErro = error.response.data.message || JSON.stringify(error.response.data);
        detalhesDoErro = error.response.data;
    }
    else {
        mensagemErro = `Erro ${error.response.status}: ${error.response.statusText || 'Sem detalhes'}`;
        detalhesDoErro = {
            status: error.response.status,
            statusText: error.response.statusText
        };
    }

    if (options.log) {
        const logger = options.console || console;
        logger.error('Erro na API:', {
            message: mensagemErro,
            details: detalhesDoErro,
            originalError: error
        });
    }

    return mensagemErro;
};
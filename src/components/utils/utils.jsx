import Chip from '@mui/material/Chip';
/**
 * mascara cpf
 *
 * to-do list
 * [] Implementar o colorMap nas linhas dos lancamentos cada situacao uma cor diferente
 * */
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
/**
 * trim nos inputs de cadastro
 * */
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


/**
 * Renderiza um Chip estilizado para status
 * @param {string} value - Valor do status
 * @param {object} options - Opções adicionais
 * @param {object} options.sx - Estilos adicionais
 * @returns {JSX.Element} Componente Chip estilizado
 */
export const statusColorChip = (value, options = {}) => {
  if (!value) return null;

  const status = String(value).toUpperCase();

  const colorMap = {
    'EFETIVADO': 'success',
    'PENDENTE': 'warning',
    'CANCELADO': 'error'
  };

  const chipColor = colorMap[status] || 'default';

  return (
    <Chip
      label={status}
      variant="outlined"
      color={chipColor}
      sx={{
        fontWeight: 'bold',
        minWidth: 100,
        ...options.sx
      }}
    />
  );
};
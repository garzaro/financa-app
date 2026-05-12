/**
 * Converte centavos para string monetária brasileira.
 * @param {number} centavos — valor em centavos (inteiro)
 * @returns {string} ex: 150000 → "R$ 1.500,00"
 */
export function formatarMoeda(centavos) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(centavos / 100);
}

/**
 * Converte string ISO 8601 para mês/ano abreviado.
 * @param {string} dataISO — ex: "2026-01-15"
 * @returns {string} ex: "Jan/26"
 */
export function formatarMesAno(dataISO) {
  // Adiciona T00:00:00 para garantir que a data seja interpretada como local/meia-noite
  const data = new Date(dataISO + 'T12:00:00');
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: '2-digit',
  });
  const partes = formatter.formatToParts(data);
  const mesAbv = partes.find(p => p.type === 'month').value;
  const anoAbv = partes.find(p => p.type === 'year').value;
  
  // Capitaliza a primeira letra do mês e remove o ponto final se houver
  const mesFormatado = mesAbv.charAt(0).toUpperCase() + mesAbv.slice(1).replace('.', '');
  
  return `${mesFormatado}/${anoAbv}`;
}

/**
 * Formata número inteiro com separador de milhar.
 * @param {number} numero
 * @returns {string} ex: 1234 → "1.234"
 */
export function formatarQuantidade(numero) {
  return new Intl.NumberFormat('pt-BR').format(numero);
}

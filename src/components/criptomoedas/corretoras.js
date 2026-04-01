/** Valores enviados à API — ajuste se o backend usar outros códigos */
export const CORRETORAS = [
  { value: 'BINANCE', label: 'Binance' },
  { value: 'MERCADO_BITCOIN', label: 'Mercado Bitcoin' },
  { value: 'FOXBIT', label: 'Foxbit' },
  { value: 'COINBASE', label: 'Coinbase' },
  { value: 'KRAKEN', label: 'Kraken' },
  { value: 'OKX', label: 'OKX' },
  { value: 'BYBIT', label: 'Bybit' },
  { value: 'OUTRA', label: 'Outra' },
];

export const MESES_NOME = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

export const STATUS_TRANSACAO = [
  { value: 1, label: '---' }, //COLOCAR UM X NOS CAMPOS
  { value: 2, label: 'SELLING' },
  { value: 3, label: 'BUYING' },
  { value: 4, label: 'ABERTA' },
  { value: 5, label: 'PARCIAL' },
  { value: 6, label: 'HOLD' },
  { value: 7, label: 'LOSS' },
  { value: 8, label: 'GAIN' },
  { value: 9, label: '0X0' },
];

export const CRIPTOMOEDA = [
  { value: 1, label: '---' },
  { value: 2, label: 'BTC' },
  { value: 3, label: 'ETH' },
];

export const ALAVANCAGEM = [
  { value: 1, label: '---' },
  { value: 2, label: '5x' },
  { value: 3, label: '10x' },
];

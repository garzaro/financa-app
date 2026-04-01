/** Valores enviados à API — ajuste se o backend usar outros códigos */
export const CORRETORAS = [
  { value: 'binance', label: 'Binance' },
  { value: 'MercadoBitcoin', label: 'Mercado Bitcoin' },
  { value: 'Foxbit', label: 'Foxbit' },
  { value: 'coinbase', label: 'Coinbase' },
  { value: 'kraken', label: 'Kraken' },
  { value: 'okx', label: 'OKX' },
  { value: 'bybit', label: 'Bybit' },
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
  { value: 'null', label: '---' }, //COLOCAR UM X NOS CAMPOS
  { value: 'selling', label: 'SELLING' },
  { value: 'buying', label: 'BUYING' },
  { value: 'aberta', label: 'ABERTA' },
  { value: 'parcial', label: 'PARCIAL' },
  { value: 'hold', label: 'HOLD' },
  { value: 'loss', label: 'LOSS' },
  { value: 'gain', label: 'GAIN' },
  { value: '0x0', label: '0X0' },
];

export const ATIVOS = [
  { value: 'btc', label: 'BTC' },
  { value: 'eth', label: 'ETH' },
];

export const ALAVANCAGEM = [
  { value: 1, label: '5x' },
  { value: 2, label: '10x' },
];

export const POSICAO = [
  { value: 'compra', label: 'COMPRA' },
  { value: 'venda', label: 'VENDA' },
];

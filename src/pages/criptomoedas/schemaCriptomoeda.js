import { z } from 'zod';

function mesNaData(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return Number(m[2]);
}

export const schemaCriptomoeda = z.object({
  dataEntrada: z
    .string()
    .nonempty('Informe a data de entrada'),

  mes: z
    .any()
    .transform((valor) => {
      if (valor === '' || valor === null || valor === undefined) return NaN;
      const numero = Number(valor);
      return numero;
    })
    .refine((numero1) => !Number.isNaN(numero1) && numero1 >= 1 && numero1 <= 12, { message: 'Selecione o mês' }),

  corretora: z.string().min(1, 'Selecione a corretora'),

  ativo: z.coerce
    .string()
    .nonempty('Selecione o ativo'),

  valorAtualAtivo: z.coerce
    .number({ invalid_type_error: 'Valor atual inválido' })
    .min(0.00000001, 'Valor maior que zero'),

  // dinheiro fiat
  valorInvestido: z.coerce
    .number({ invalid_type_error: 'Valor investido inválido' })
    .positive('Valor acima de R$ 0,01'),

  fracaoAtivo: z.coerce
    .string()
    .nonempty('campo obrigatório'),

  statusTransacao: z
    .string().optional().refine(val => !!val, {
      message: 'Selecione o status',
    }),

  tipoTransacao: z.coerce
      .string()
      .nonempty('Selecione a posição'),
  })
  .refine((data) => mesNaData(data.dataEntrada) === data.mes, {
    message: 'O mês deve ser a mesma data de entrada',
    path: ['mes'],
  });

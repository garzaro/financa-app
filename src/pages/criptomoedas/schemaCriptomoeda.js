import { z } from 'zod';

function mesNaData(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return Number(m[2]);
}

export const schemaCriptomoeda = z
  .object({
    dataEntrada: z.string().min(1, 'Informe a data de entrada'),

    mes: z
      .any()
      .transform((valor) => {
        if (valor === '' || valor === null || valor === undefined) return NaN;
        const numero = Number(valor);
        return numero;
      })
      .refine((numero1) => !Number.isNaN(numero1) && numero1 >= 1 && numero1 <= 12, { message: 'Selecione o mês' }),

    corretora: z.string().min(1, 'Selecione a corretora'),

    moeda: z
      .string()
      .min(1, 'Informe a moeda')
      .max(32, 'Moeda muito longa')
      .transform((moeda) => moeda.trim()),
      // .transform((s) => s.trim()),

    valorAtualMoeda: z.coerce
      .number({ invalid_type_error: 'Valor atual inválido' })
      .min(0.00000001, 'Valor atual deve ser maior que zero'),

    valorInvestido: z.coerce
      .number({ invalid_type_error: 'Valor investido inválido' })
      .min(0.01, 'Valor investido deve ser pelo menos R$ 0,01'),
  })
  .refine((data) => mesNaData(data.dataEntrada) === data.mes, {
    message: 'O mês deve ser a mesma data de entrada',
    path: ['mes'],
  });

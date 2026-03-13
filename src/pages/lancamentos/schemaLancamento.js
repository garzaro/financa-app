import {z} from "zod";

export const schemaLancamento = z.object({
  // id: z.number().int().positive(),

  tipoLancamento: z
    .string()
    .nonempty('Selecione o tipo de lançamento'),

  mes: z.coerce
    .number({
      required_error: 'Selecione o mês',
      invalid_type_error: 'Selecione o mês',
    })
    .min(1, 'Selecione o mês')
    .max(12, 'Selecione o mês'),

  ano: z.coerce
    .number({
      required_error: 'Selecione o ano',
      invalid_type_error: 'Selecione o ano',
    })
    .refine(y => y >= 1900, 'Ano inválido'),

  valor: z.coerce
    .number({
      required_error: 'O valor é obrigatório',
      invalid_type_error: 'O valor deve ser um número válido'
    })
    .min(0.01, 'O valor mínimo é R$ 0,01')
    .max(9999999.99, 'O valor excede o limite permitido'),

  descricao: z
    .string()
    .max(100, 'O campo deve conter no máximo 100 caracteres')
    .nonempty("Descreva o lançamento")
    /**permite string vazia**/
    .or(z.literal(' ')),
});


/**
 * .positive('O valor deve ser maior que zero')
 * **/
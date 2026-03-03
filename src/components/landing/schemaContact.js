import {z} from "zod";

export const schemaContact = z.object({

  nomeCompleto: z
    .string()
    .nonempty('Nome completo é de preenchimento obrigatório'),

  email: z
    .string()
    .nonempty('Email é de preenchimento obrigatório'),

  mensagem: z
    .string()
    .nonempty('Mensagem é de preenchimento obrigatório'),
});
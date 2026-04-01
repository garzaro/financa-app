import {
  ALAVANCAGEM,
  ATIVOS,
  CORRETORAS,
  MESES_NOME, POSICAO,
  STATUS_TRANSACAO,
} from "@/components/criptomoedas/corretoras.js";

// DIA	MÊS	EXCHANGE	MOEDA	leverage	ENTRADA	FIAT	FRAÇÃO

export const FORM_FIELDS = [
  { name: 'dataEntrada', type: 'date', label: 'Data Entrada',
    onChange: (e, { setValue }) => {
      const date = new Date(e.target.value);
      if (!isNaN(date)) {
        setValue('mes', date.getMonth() + 1);
      }
    },
  },
  { name: 'mes', label: 'Mês - nao sei porque  mas coloquei', type: "select",
    options: MESES_NOME,
  },
  { name: 'corretora', label: 'Corretora', type: "select",
    options: CORRETORAS,
  },

  { name: 'ativo', label: 'Ativo', type: 'select',
    options: ATIVOS,
  },

  { name: 'alavancagem', label: 'Alavancagem', type: 'select',
    options: ALAVANCAGEM,
  },

  // valor da cripto - valor de entrada
  { id: 'valorInvestido', name: 'valorInvestido', label: 'FIAT', },
  { id: 'valorAtualAtivo', name: 'valorAtualAtivo', label: 'Valor Atual Cripto', },

  // resultado divisao = valorInvestido / valorAtualAtivo disabled: true,
  { id: 'fracaoAtivo', name: 'fracaoAtivo', label: 'Fração - Ativo', readOnly: true, },

  { name: 'statusTransacao', label: 'Status', type: 'select',
    options: STATUS_TRANSACAO,
  },
];

// { name: 'posicao', label: 'Tipo Transanção', type: 'select',
//   options: POSICAO,
// },


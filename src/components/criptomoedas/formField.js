import {
  ALAVANCAGEM,
  CORRETORAS,
  CRIPTOMOEDA,
  MESES_NOME,
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
    options: MESES_NOME
  },
  { name: 'corretora', label: 'Corretora', type: "select",
    options: CORRETORAS
  },
  { name: 'criptomoeda', label: 'Criptomoeda', type: "select",
    options: CRIPTOMOEDA
  },
  { name: 'alavancagem', label: 'Alavancagem', type: 'select',
    options: ALAVANCAGEM,
  },

  { name: 'valor-atual-cripto', label: 'Valor Atual - Entrada' },
  { name: 'valor-compra', label: 'FIAT' },

  { name: 'fracao-moeda', label: 'Fração - Moeda' },

  { name: 'status_transacao', label: 'Status Transação', type: 'select',
    options: STATUS_TRANSACAO,
  },

];


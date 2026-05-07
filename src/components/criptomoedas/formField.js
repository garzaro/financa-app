import {
  ALAVANCAGEM,
  ATIVOS,
  CORRETORAS, CURRENCY,
  MESES_NOME, POSICAO,
  STATUS_TRANSACAO,
} from "@/components/criptomoedas/corretoras.js";

/**
 * TODO-list
 * [] Status habilitado apenas no update - padrao ANALISAR
 * [] Mes desabilitado para CRIAR E ATUALIZAR
 * **/

export const FORM_FIELDS = [
  { id: 'dataEntradaID',  name: 'dataEntrada', type: 'date', label: 'Data Entrada',
    onChange: (e, { setValue }) => {
      const date = new Date(e.target.value + 'T00:00:00');
      if (!isNaN(date)) {
        setValue('mes', date.getMonth() + 1);
      }
    },
  },
  { id: 'mesID', name: 'mes', label: 'Mês - pois é', type: "select",
    options: MESES_NOME, readOnly: true,
  },
  { id:'corretoraID', name: 'corretora', label: 'Corretora', type: "select",
    options: CORRETORAS,
  },

  { id:'ativoID', name: 'ativo', label: 'Ativo', type: 'select',
    options: ATIVOS,
  },

  { id:'alavancagemID', name: 'alavancagem', label: 'Alavancagem', type: 'select',
    options: ALAVANCAGEM,
  },

  { id: 'moedaCorrenteID', name: 'moedaCorrente', label: 'Moeda Corrente', type: 'select',
    options: CURRENCY,
  },

  // valor da cripto - valor de entrada
  { id: 'valorInvestidoID', name: 'valorInvestido', label: 'FIAT', },
  { id: 'valorAtualAtivoID', name: 'valorAtualAtivo', label: 'Valor Atual Cripto', },

  // resultado divisao = valorInvestido / valorAtualAtivo disabled: true,
  { id: 'fracaoAtivoID', name: 'fracaoAtivo', label: 'Fração - Ativo',
    readOnly: true,
  },

  { id: 'statusTransacaoID', name: 'statusTransacao', label: 'Status', type: 'select',
    options: STATUS_TRANSACAO, readOnly: true,
  },

  { id: 'posicaoID', name: 'posicao', label: 'Posição', type: 'select',
    options: POSICAO, readOnly: true,
  },
  { id: 'dataSaidaID',  name: 'dataSaida', type: 'date', label: 'Data Saida',
    onChange: (e, { setValue }) => {
      const date = new Date(e.target.value + 'T00:00:00');
      if (!isNaN(date)) {
        setValue('mes', date.getMonth() + 1);
      }
    },
  },
];

export const DISABLED_FIELDS = [ 'mes','fracaoAtivo', 'statusTransacao', 'posicao', 'dataSaida'] ;



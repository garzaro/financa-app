/**
 * Serviço para gerenciar o localStorage do navegador.
 * Permite salvar, obter, remover e limpar dados de forma persistente.
 */
export const LocalStorageService = () => {
  return {

    /**
     * salva o item no localStorage.
     * @param {string} chave - A chave de identificação.
     * @param {*} valor - O valor a ser armazenado (poder ser objeto, string, numero, etc.)
     * Obs. retorna um objeto javascript la do servidor que deve ser transformado em string
     **/
    salvarItem:(chave, valor) => {
      localStorage.setItem(chave, JSON.stringify(valor));
    },
    /**
     * Obtém um item do localStorage.
     * @param {string} chave - A chave do item (salvarItem) a ser recuperado.
     * @returns {*} O valor armazenado, ou `null` se não existir.
     **/
    obterItem:(chave) => {
      const item = localStorage.getItem(chave);
      return item ? JSON.parse(item) : null;
    },
    /**
     * remove um item do localStorage
     * @param {string} chave - A chave do item a ser removido
     * a identificação salva pelo setItem
     **/
    removerItem:(chave) => {
      localStorage.removeItem(chave);
    },
    /**
     * Limpa TODOS os itens do localStorage.
     * Usar com cuidado, pois remove tudo do domínio atual!)
     **/
    limparItem:() => {
      localStorage.clear();
    },
  }
}



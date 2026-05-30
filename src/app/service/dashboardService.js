import dados from '../../mocks/dashboardData.json'

/**
 * Retorna todos os lançamentos.
 * Atualmente: importa do mock JSON.
 * Futuramente: fetch('/api/lancamentos')
 * 
 * Estratégia de substituição futura:
 * Quando a API real estiver disponível, substituir a implementação por um fetch:
 * const response = await fetch('/api/lancamentos', { credentials: 'include' })
 * if (!response.ok) throw { status: response.status }
 * const data = await response.json()
 * return data.lancamentos
 *
 * @returns {Promise<Array>}
 */
export async function getLancamentos() {
  // Simula latência de rede para testar skeleton loading
  await new Promise(resolve => setTimeout(resolve, 600))
  return dados.lancamentos
}

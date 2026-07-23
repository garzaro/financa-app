import Apiservice from '../api/apiservice.js';
const lancamentoApi = Apiservice('/api/lancamento');

export async function getLancamentos() {
  // Call backend API to fetch lancamentos
  const response = await lancamentoApi.get('');
  // Assuming the backend returns { lancamentos: [...] }
  return response.data.lancamentos;
}

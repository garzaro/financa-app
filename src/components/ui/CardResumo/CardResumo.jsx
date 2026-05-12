import React from 'react';

/**
 * @param {string}  titulo   — rótulo da métrica (ex: "Receitas Efetivadas")
 * @param {string}  valor    — valor já formatado (ex: "R$ 1.500,00" ou "42")
 * @param {string}  tipo     — "receita" | "despesa" | "neutro"
 * @param {string}  status   — "efetivado" | "pendente"
 * @param {string}  [icone]  — emoji ou nome de ícone opcional (ex: "📈")
 */
function CardResumo({ titulo, valor, tipo, status, icone }) {
  const getStyles = (t, s) => {
    if (t === 'receita') {
      return s === 'efetivado'
        ? { dot: 'bg-green-500', text: 'text-green-700' }
        : { dot: 'bg-yellow-400', text: 'text-yellow-700' };
    }
    if (t === 'despesa') {
      return s === 'efetivado'
        ? { dot: 'bg-red-500', text: 'text-red-700' }
        : { dot: 'bg-orange-400', text: 'text-orange-700' };
    }
    return { dot: 'bg-blue-500', text: 'text-blue-700' }; // Neutro
  };

  const styles = getStyles(tipo, status);
  const displayValue = valor ?? "—";

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-3 h-3 rounded-full ${styles.dot}`}></span>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {icone && <span className="mr-1">{icone}</span>}
          {titulo}
        </h3>
      </div>
      
      <div className={`text-2xl font-bold mb-2 ${styles.text}`}>
        {displayValue}
      </div>
      
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
           {status === 'efetivado' ? '✅ efetivado' : '⏳ pendente'}
        </span>
      </div>
    </div>
  );
}

export default CardResumo;

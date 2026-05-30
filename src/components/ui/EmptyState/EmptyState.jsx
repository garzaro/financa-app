import React from 'react';

function EmptyState() {
  return (
    <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Sem lançamentos</h3>
      <p className="text-gray-500 max-w-sm">
        Não encontramos nenhum dado para o período selecionado. 
        Comece cadastrando novos lançamentos para visualizar o dashboard.
      </p>
    </div>
  );
}

export default EmptyState;

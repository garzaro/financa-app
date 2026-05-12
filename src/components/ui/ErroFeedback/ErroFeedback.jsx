import React from 'react';

function ErroFeedback({ mensagem = 'Ocorreu um erro ao carregar o dashboard. Tente novamente mais tarde.' }) {
  return (
    <div className="bg-red-50 p-12 rounded-xl border border-red-200 flex flex-col items-center justify-center text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-red-700 mb-2">Erro de Carregamento</h3>
      <p className="text-red-600 max-w-sm">
        {mensagem}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Recarregar Página
      </button>
    </div>
  );
}

export default ErroFeedback;

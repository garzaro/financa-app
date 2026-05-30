import React from 'react';
import CardResumo from '../../ui/CardResumo/CardResumo';
import GraficoLinha from '../GraficoLinha/GraficoLinha';
import SkeletonCard from '../../ui/SkeletonCard/SkeletonCard';
import EmptyState from '../../ui/EmptyState/EmptyState';
import ErroFeedback from '../../ui/ErroFeedback/ErroFeedback';
import { formatarMoeda, formatarQuantidade } from '../../../utils/formatters';

/**
 * @param {object}  metricas  — objeto com todas as métricas do useDashboard
 * @param {boolean} isLoading
 * @param {boolean} isError
 * @param {boolean} isEmpty
 */
function DashboardContainer({ metricas, isLoading, isError, isEmpty }) {
  if (isError) return <ErroFeedback />;
  if (isEmpty) return <EmptyState />;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardResumo 
          titulo="Lançamentos Efetivados" 
          valor={formatarQuantidade(metricas.qtdEfetivados)} 
          tipo="neutro" 
          status="efetivado" 
          icone="📝"
        />
        <CardResumo 
          titulo="Lançamentos Pendentes" 
          valor={formatarQuantidade(metricas.qtdPendentes)} 
          tipo="neutro" 
          status="pendente" 
          icone="⏳"
        />
        <CardResumo 
          titulo="Total Efetivado" 
          valor={formatarMoeda(metricas.totalEfetivado)} 
          tipo="neutro" 
          status="efetivado" 
          icone="💰"
        />
        <CardResumo 
          titulo="Total Pendente" 
          valor={formatarMoeda(metricas.totalPendente)} 
          tipo="neutro" 
          status="pendente" 
          icone="🕒"
        />
        <CardResumo 
          titulo="Despesas Pendentes" 
          valor={formatarMoeda(metricas.despesasPendentes)} 
          tipo="despesa" 
          status="pendente" 
          icone="📉"
        />
        <CardResumo 
          titulo="Receitas Pendentes" 
          valor={formatarMoeda(metricas.receitasPendentes)} 
          tipo="receita" 
          status="pendente" 
          icone="📈"
        />
        <CardResumo 
          titulo="Despesas Efetivadas" 
          valor={formatarMoeda(metricas.despesasEfetivadas)} 
          tipo="despesa" 
          status="efetivado" 
          icone="💸"
        />
        <CardResumo 
          titulo="Receitas Efetivadas" 
          valor={formatarMoeda(metricas.receitasEfetivadas)} 
          tipo="receita" 
          status="efetivado" 
          icone="💎"
        />
      </div>

      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoLinha 
          titulo="Evolução de Lançamentos Efetivados"
          dados={metricas.serieEfetivadosPorMes}
          chaveX="mes"
          chaveY="total"
          corLinha="#10b981"
          labelY="Total Efetivado"
        />
        <GraficoLinha 
          titulo="Evolução de Receitas Efetivadas"
          dados={metricas.serieReceitaEfetivadaPorMes}
          chaveX="mes"
          chaveY="total"
          corLinha="#3b82f6"
          labelY="Receita Efetivada"
        />
      </div>
    </div>
  );
}

export default DashboardContainer;

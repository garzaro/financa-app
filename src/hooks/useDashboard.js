import { useState, useEffect, useMemo } from 'react'
import { getLancamentos } from '../app/service/dashboardService.js'
import { formatarMesAno } from '../utils/formatters'

export function useDashboard() {
  const [lancamentos, setLancamentos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true)
    setIsError(false)
    getLancamentos()
      .then(data => {
        if (isMounted) {
          setLancamentos(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })
    return () => { isMounted = false; };
  }, [])

  const metricas = useMemo(() => {
    if (!lancamentos || lancamentos.length === 0) return null

    const efetivados = lancamentos.filter(l => l.status === 'efetivado')
    const pendentes  = lancamentos.filter(l => l.status === 'pendente')

    const soma = arr => arr.reduce((acc, l) => acc + l.valor, 0)

    // Agrupamento por mês para séries temporais
    function agruparPorMes(lista) {
      const mapa = {}
      lista.forEach(l => {
        const chave = formatarMesAno(l.data)
        mapa[chave] = (mapa[chave] ?? 0) + l.valor
      })
      
      // Ordenação cronológica básica (considerando que os dados do mock são 2026)
      // Para uma ordenação real robusta, precisaríamos converter as chaves de volta para Date ou usar as datas originais.
      // Como o spec pede ordenação cronológica e as chaves são Jan/26, Fev/26...
      const mesesOrdem = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      return Object.entries(mapa)
        .sort(([a], [b]) => {
            const [mesA, anoA] = a.split('/');
            const [mesB, anoB] = b.split('/');
            if (anoA !== anoB) return anoA.localeCompare(anoB);
            return mesesOrdem.indexOf(mesA) - mesesOrdem.indexOf(mesB);
        })
        .map(([mes, total]) => ({ mes, total }))
    }

    return {
      qtdEfetivados:  efetivados.length,
      qtdPendentes:   pendentes.length,
      totalEfetivado: soma(efetivados),
      totalPendente:  soma(pendentes),
      despesasPendentes:  soma(pendentes.filter(l => l.tipo === 'despesa')),
      despesasEfetivadas: soma(efetivados.filter(l => l.tipo === 'despesa')),
      receitasPendentes:  soma(pendentes.filter(l => l.tipo === 'receita')),
      receitasEfetivadas: soma(efetivados.filter(l => l.tipo === 'receita')),
      serieEfetivadosPorMes:       agruparPorMes(efetivados),
      serieReceitaEfetivadaPorMes: agruparPorMes(efetivados.filter(l => l.tipo === 'receita')),
    }
  }, [lancamentos])

  return {
    ...(metricas || {
        qtdEfetivados: 0,
        qtdPendentes: 0,
        totalEfetivado: 0,
        totalPendente: 0,
        despesasPendentes: 0,
        despesasEfetivadas: 0,
        receitasPendentes: 0,
        receitasEfetivadas: 0,
        serieEfetivadosPorMes: [],
        serieReceitaEfetivadaPorMes: []
    }),
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && lancamentos.length === 0,
  }
}

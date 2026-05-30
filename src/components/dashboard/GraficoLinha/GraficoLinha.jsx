import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { formatarMoeda } from '../../../utils/formatters';

/**
 * Tooltip customizado — exibe valor formatado em R$
 */
function TooltipCustomizado({ active, payload, label, labelY }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded p-3 shadow-md text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-gray-600">
        {labelY ?? 'Valor'}: <span className="font-bold">{formatarMoeda(payload[0].value)}</span>
      </p>
    </div>
  );
}

/**
 * @param {string}  titulo      — título exibido acima do gráfico
 * @param {Array}   dados       — array de objetos { [eixoX]: string, [eixoY]: number }
 * @param {string}  chaveX      — nome da propriedade usada no eixo X (ex: "mes")
 * @param {string}  chaveY      — nome da propriedade usada no eixo Y (ex: "total")
 * @param {string}  [corLinha]  — cor hex da linha (default: "#3b82f6")
 * @param {string}  [labelY]    — rótulo do eixo Y para tooltip (ex: "Valor")
 */
function GraficoLinha({ titulo, dados = [], chaveX, chaveY, corLinha = "#3b82f6", labelY }) {
  if (!dados || dados.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h3>
        <p className="text-gray-400 italic">Sem dados para exibir</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{titulo}</h3>
      {/* min-h-0*/}
      <div className="w-full h-75" style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer width="100%" aspect={2} >
          <LineChart data={dados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
                dataKey={chaveX} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                tickFormatter={(val) => `R$ ${val / 100}`}
                hide
            />
            <Tooltip content={<TooltipCustomizado labelY={labelY} />} />
            <Line
              type="monotone"
              dataKey={chaveY}
              stroke={corLinha}
              strokeWidth={3}
              dot={{ r: 4, fill: corLinha, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GraficoLinha;

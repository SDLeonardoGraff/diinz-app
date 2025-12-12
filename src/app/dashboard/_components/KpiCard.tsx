// // src/components/dashboard/KpiCard.tsx
// import { ArrowUp, ArrowDown, Info } from 'lucide-react';
// import React from 'react';

// // Assumindo a interface definida em src/data/dashboard-kpis.ts
// interface KpiMetric {
//   titulo: string;
//   valor: string | number;
//   unidade: string;
//   tendencia?: number;
//   descricao?: string;
//   tipo: 'success' | 'alert' | 'error' | 'info';
// }

// interface KpiCardProps {
//   data: KpiMetric;
// }

// // Mapeamento de cor baseado no tipo
// const typeStyles = {
//   success: { bg: 'bg-green-500/10', text: 'text-green-600', trendIcon: ArrowUp },
//   error: { bg: 'bg-red-500/10', text: 'text-red-600', trendIcon: ArrowDown },
//   alert: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', trendIcon: Info },
//   info: { bg: 'bg-blue-500/10', text: 'text-blue-600', trendIcon: Info },
// };

// const formatValue = (valor: string | number, unidade: string) => {
//     if (unidade === 'R$') {
//         // Formato para moeda brasileira
//         return `R$ ${(typeof valor === 'number' ? valor : parseFloat(valor)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
//     }
//     return `${valor} ${unidade}`;
// };

// export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
//   const { titulo, valor, unidade, tendencia, descricao, tipo } = data;
//   const styles = typeStyles[tipo];
//   const TrendIcon = styles.trendIcon;
//   const isPositive = tendencia && tendencia > 0;
//   const trendColor = isPositive ? 'text-green-600' : (tendencia && tendencia < 0 ? 'text-red-600' : 'text-gray-500');

//   return (
//     <div className={`p-5 rounded-xl shadow-md bg-gray-800 border border-gray-900/80`}>
//       <h3 className="text-sm font-medium text-gray-500 truncate">{titulo}</h3>
//       <div className="flex items-end justify-between mt-1">
//         <span className="text-3xl font-bold text-white">
//           {formatValue(valor, unidade)}
//         </span>
//         {tendencia !== undefined && (
//           <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
//             <TrendIcon size={16} className="mr-1" />
//             {Math.abs(tendencia).toFixed(1)}%
//           </div>
//         )}
//       </div>
//       {descricao && <p className="text-xs text-gray-400 mt-1">{descricao}</p>}
//     </div>
//   );
// };
// src/components/dashboard/KpiCard.tsx
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import React from 'react';

// Assumindo a interface definida em src/data/dashboard-kpis.ts
interface KpiMetric {
  titulo: string;
  valor: string | number;
  unidade: string;
  tendencia?: number;
  descricao?: string;
  tipo: 'success' | 'alert' | 'error' | 'info';
}

interface KpiCardProps {
  data: KpiMetric;
}

// Mapeamento de cor baseado no tipo
const typeStyles = {
  success: { bg: 'bg-green-500/10', text: 'text-green-400', trendIcon: ArrowUp }, // Alterei para 400 para melhor contraste em fundo escuro
  error: { bg: 'bg-red-500/10', text: 'text-red-400', trendIcon: ArrowDown },
  alert: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', trendIcon: Info },
  info: { bg: 'bg-blue-500/10', text: 'text-blue-400', trendIcon: Info },
};

const formatValue = (valor: string | number, unidade: string) => {
    if (unidade === 'R$') {
        // Formato para moeda brasileira
        return `R$ ${(typeof valor === 'number' ? valor : parseFloat(valor)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
    return `${valor} ${unidade}`;
};

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const { titulo, valor, unidade, tendencia, descricao, tipo } = data;
  const styles = typeStyles[tipo];
  const TrendIcon = styles.trendIcon;
  const isPositive = tendencia && tendencia > 0;
  // Cor ajustada para melhor contraste em fundo escuro
  const trendColor = isPositive ? 'text-green-400' : (tendencia && tendencia < 0 ? 'text-red-400' : 'text-gray-400');

  return (
    // 1. AJUSTE: w-full para garantir que ele preencha a coluna do grid pai.
    // Padding p-4 sm:p-5 para melhor espaçamento em telas menores.
    <div className={`p-4 sm:p-5 rounded-xl shadow-lg bg-gray-800 border border-gray-700 w-full`}>
      
      {/* 2. AJUSTE: min-w-0 e truncate para garantir que o título não force a largura */}
      <h3 className="text-sm font-medium text-gray-500 truncate min-w-0">{titulo}</h3>
      
      <div className="flex items-end justify-between mt-1">
        {/* 3. AJUSTE: min-w-0 e flex-shrink para que o valor e a tendência se ajustem bem */}
        <span className="text-2xl sm:text-3xl font-bold text-white flex-shrink min-w-0">
          {formatValue(valor, unidade)}
        </span>
        
        {tendencia !== undefined && (
          // flex-shrink-0 para garantir que a tendência seja sempre visível
          <div className={`flex items-center text-sm font-semibold flex-shrink-0 ml-3 ${trendColor}`}>
            <TrendIcon size={16} className="mr-1" />
            {Math.abs(tendencia).toFixed(1)}%
          </div>
        )}
      </div>
      
      {descricao && <p className="text-xs text-gray-400 mt-1">{descricao}</p>}
    </div>
  );
};
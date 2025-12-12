// src/components/dashboard/ActivityFeed.tsx
import React from 'react';
import { Clock, ShoppingCart, Scale, DollarSign } from 'lucide-react';

// Assumindo a interface definida em src/data/dashboard-activity.ts
interface RecentActivity {
  id: number;
  descricao: string;
  data: string;
  categoria: 'Pedido' | 'Fiscal' | 'Financeiro';
}

interface ActivityFeedProps {
  activities: RecentActivity[];
}

const CategoryIconMap = {
  Pedido: ShoppingCart,
  Fiscal: Scale,
  Financeiro: DollarSign,
};

// Mapeamento de cores para um visual moderno (mantendo o tema escuro)
const CategoryColorMap = {
  Pedido: { bg: 'bg-green-600/20', text: 'text-green-400' }, // Verde para Pedidos (vendas)
  Fiscal: { bg: 'bg-red-600/20', text: 'text-red-400' },     // Vermelho para Fiscal (alerta)
  Financeiro: { bg: 'bg-blue-600/20', text: 'text-blue-400' }, // Azul para Financeiro
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    // 1. AJUSTE: Removendo 'h-full' do contêiner principal para permitir que ele se expanda ou contraia 
    // com base no conteúdo ou no grid pai (melhor em layouts responsivos como Grid).
    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl w-full"> 
      
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Atividades Recentes
      </h3>
      
      {/* 2. RESPONSIVIDADE: Definindo max-h e overflow-y para que o feed seja scrollável
             e não quebre o layout em telas menores ou maiores. */}
      <ul className="space-y-3 max-h-100 sm:max-h-125 overflow-y-auto pr-2">
        {activities.map((activity) => {
          const Icon = CategoryIconMap[activity.categoria];
          const color = CategoryColorMap[activity.categoria];
          
          return (
            <li 
              key={activity.id} 
              className="flex items-start gap-3 p-3 hover:bg-gray-700/70 rounded-lg transition-colors cursor-pointer"
            >
              {/* 3. CORES MELHORADAS: Usando o CategoryColorMap */}
              <div className={`p-2 rounded-full ${color.bg} ${color.text} shrink-0`}>
                <Icon size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                {/* min-w-0 evita que o texto longo force a quebra do layout */}
                <p className="text-sm font-medium text-white wrap-words">{activity.descricao}</p>
                
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <Clock size={12} className="mr-1 shrink-0" />
                  {/* Adicionando data com opacidade para contraste suave */}
                  <span className="opacity-80">{activity.data}</span> 
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
// import { KpiCard } from "./_components/KpiCard";
// // import { RevenueAreaChart } from "./_components/RevenueAreaChart";
// import { ActivityFeed } from "./_components/ActivityFeed";
// import { DADOS_FATURAMENTO_MENSAL } from "./data/chart";
// import { ATIVIDADES_RECENTES } from "./data/activity";
// import { METRICAS_CHAVE } from "./data/metricas";
// import { RevenueBarChart } from "./_components/RevenueAreaChart";

// export default function Dashboard() {
//     const kpis = METRICAS_CHAVE;
//     const chartData = DADOS_FATURAMENTO_MENSAL;
//     const recentActivity = ATIVIDADES_RECENTES;
    
//     return (
//         <div className="w-full h-full space-y-8">
//             <h1 className="text-3xl font-bold text-white select-none">Seja bem-vindo!</h1>
        
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 {kpis.map((metric) => (
//                     <KpiCard key={metric.titulo} data={metric} />
//                 ))}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* GRÁFICO (Ocupa 2/3 da largura) */}
//                 <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-md">
//                 <h2 className="text-lg font-semibold text-white mb-4">Faturamento Mensal</h2>
//                 <div className="h-80 flex items-center justify-center text-white border border-dashed border-gray-300 rounded-lg">
//                     {/* 💡 Aqui você integraria sua biblioteca de gráficos (Recharts, etc.) */}
//                     {/* Gráfico de Linha/Barra de Faturamento dos últimos meses. */}
//                     {/* <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(chartData, null, 2)}</pre> */}
//                     <RevenueBarChart data={chartData} />
//                 </div>
//                 </div>

//                 {/* FEED DE ATIVIDADES (Ocupa 1/3 da largura) */}
//                 <div className="lg:col-span-1">
//                 <ActivityFeed activities={recentActivity} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// src/app/dashboard/page.tsx (Assumindo que este é o arquivo)

import { KpiCard } from "./_components/KpiCard";
import { ActivityFeed } from "./_components/ActivityFeed";
import { DADOS_FATURAMENTO_MENSAL } from "./data/chart";
import { ATIVIDADES_RECENTES } from "./data/activity";
import { METRICAS_CHAVE } from "./data/metricas";
import { RevenueBarChart } from "./_components/RevenueAreaChart";
// 🛑 CORREÇÃO: Usar o nome do arquivo componente BarChart correto (assumindo que você o renomeou)
// ^ Se você não renomeou o arquivo, use: import { RevenueBarChart } from "./_components/RevenueAreaChart";


export default function Dashboard() {
    const kpis = METRICAS_CHAVE;
    const chartData = DADOS_FATURAMENTO_MENSAL;
    const recentActivity = ATIVIDADES_RECENTES;
    
    return (
        // 1. AJUSTE: Adicionar padding horizontal para telas menores (sm:px-0 assume que o layout pai já tem padding)
        <div className="w-full h-full space-y-8 p-4 sm:p-0"> 
            
            <h1 className="text-3xl font-bold text-white select-none">Seja bem-vindo!</h1>
        
            {/* KPI Cards: 4 colunas em telas grandes, 2 em médio, 1 em pequeno */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((metric) => (
                    // KpiCard já tem w-full, se ajusta automaticamente ao grid
                    <KpiCard key={metric.titulo} data={metric} />
                ))}
            </div>

            {/* Seção principal: Gráfico e Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* GRÁFICO (Ocupa 2/3 da largura em LG+) */}
                <div className="lg:col-span-2 bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl min-h-75">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Faturamento Mensal</h2>
                    
                    {/* 2. AJUSTE: Otimizando o container do Chart. A altura é essencial para o ResponsiveContainer */}
                    <div className="h-72 w-full"> 
                        <RevenueBarChart data={chartData} />
                    </div>
                </div>

                {/* FEED DE ATIVIDADES (Ocupa 1/3 da largura em LG+) */}
                <div className="lg:col-span-1">
                    {/* ActivityFeed já está com w-full e max-h definido internamente */}
                    <ActivityFeed activities={recentActivity} />
                </div>
            </div>
        </div>
    )
}
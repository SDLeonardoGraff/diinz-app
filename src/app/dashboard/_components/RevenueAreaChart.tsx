// src/components/dashboard/RevenueBarChart.tsx
'use client';

import { TrendingUp } from "lucide-react";
// 🛑 NOVO: Importamos ResponsiveContainer
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; 

// Tipo de dados
interface ChartDataPoint {
  label: string;
  valor: number;
}

interface RevenueAreaChartProps {
  data: ChartDataPoint[];
}

// Configuração do Chart (ajustada para refletir o faturamento)
const chartConfig = {
  valor: { 
    label: "Faturamento",
    color: "royalblue", 
  },
  label: {
    label: "Mês",
  }
};

const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

export const RevenueBarChart: React.FC<RevenueAreaChartProps> = ({ data }) => {
  return (
    // O ChartContainer agora precisa de uma altura definida para o ResponsiveContainer funcionar
    <ChartContainer config={chartConfig} className="min-h-60 h-full w-full"> 
      
      {/* 🛑 ENVOLVIMENTO: Usamos ResponsiveContainer para gerenciar a largura do BarChart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          data={data}
          // Removemos as margens horizontais aqui, pois o ResponsiveContainer e o ChartContainer já gerenciam o espaço
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }} 
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#444" />
          
          <XAxis
            dataKey="label" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            stroke="#fff" 
          />
          
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
            stroke="#fff" 
          />
          
          {/* Tooltip interativo do shadcn (mantido) */}
          <ChartTooltip 
              cursor={false} 
              content={
                <ChartTooltipContent 
                  className="bg-zinc-900/95 border border-zinc-700 text-white shadow-lg"
                  formatter={(value) => formatCurrency(value as number)} />
              } 
          />
          
          <Bar
            dataKey="valor"
            fill="var(--color-valor)" 
            radius={4} 
          />
        </BarChart>
      </ResponsiveContainer>
      {/* Fim do ResponsiveContainer */}
      
    </ChartContainer>
  );
};
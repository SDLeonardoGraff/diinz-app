// src/data/dashboard-charts.ts

export interface ChartDataPoint {
  label: string;
  valor: number; // Valor monetário
}

export const DADOS_FATURAMENTO_MENSAL: ChartDataPoint[] = [
  // 1º Semestre (Seu código original com ajustes)
  { label: "Jan", valor: 35000 },
  { label: "Fev", valor: 38500 },
  { label: "Mar", valor: 42000 },
  { label: "Abr", valor: 45890 },
  { label: "Mai", valor: 41500 }, // Queda sazonal
  { label: "Jun", valor: 49000 },
  
  // 2º Semestre (Dados adicionados)
  { label: "Jul", valor: 51200 },
  { label: "Ago", valor: 48900 }, // Leve queda pós-férias
  { label: "Set", valor: 55500 },
  { label: "Out", valor: 58100 },
  { label: "Nov", valor: 65000 }, // Preparação para feriados
  { label: "Dez", valor: 72400 }, // Pico de fim de ano
];
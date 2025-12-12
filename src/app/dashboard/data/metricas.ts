// src/data/dashboard-kpis.ts

export interface KpiMetric {
  titulo: string;
  valor: string | number;
  unidade: string; // Ex: '%', 'R$', 'un'
  tendencia?: number; // Variação percentual (ex: 12.5 para +12.5%)
  descricao?: string; // Comparação (ex: "vs Mês Anterior")
  tipo: 'success' | 'alert' | 'error' | 'info';
}

export const METRICAS_CHAVE: KpiMetric[] = [
  {
    titulo: "Faturamento Bruto (Mês)",
    valor: 45890.50,
    unidade: "R$",
    tendencia: 12.5,
    descricao: "vs Mês Anterior",
    tipo: "success",
  },
  {
    titulo: "Pedidos Pendentes",
    valor: 15,
    unidade: "un",
    tendencia: -25, // Diminuição de 25% na pendência
    descricao: "vs Semana Passada",
    tipo: "alert",
  },
  {
    titulo: "Boletos Vencidos",
    valor: 7200.00,
    unidade: "R$",
    tendencia: 3.1, 
    descricao: "Total em Aberto",
    tipo: "error",
  },
  {
    titulo: "NF-e Emitidas (Hoje)",
    valor: 120,
    unidade: "un",
    tendencia: 0,
    descricao: "Média Diária",
    tipo: "info",
  },
];
// src/data/dashboard-activity.ts

export interface RecentActivity {
  id: number;
  descricao: string;
  data: string; // Ex: "Há 5 minutos"
  categoria: 'Pedido' | 'Fiscal' | 'Financeiro';
}

export const ATIVIDADES_RECENTES: RecentActivity[] = [
  {
    id: 101,
    descricao: "Novo Pedido #P00129 recebido no valor de R$ 999,00.",
    data: "Há 5 minutos",
    categoria: "Pedido",
  },
  {
    id: 201,
    descricao: "NF-e 27621 Rejeitada. Verificar dados do destinatário.",
    data: "Há 1 hora",
    categoria: "Fiscal",
  },
  {
    id: 305,
    descricao: "Boleto #B00044 venceu há 7 dias. Enviar lembrete.",
    data: "Ontem",
    categoria: "Financeiro",
  },
  {
    id: 102,
    descricao: "Pedido #P00128 alterado para status 'Enviado'.",
    data: "2 dias atrás",
    categoria: "Pedido",
  },
];
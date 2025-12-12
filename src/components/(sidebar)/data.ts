// sidebarConfig.ts (Crie este arquivo separado)

import { LayoutDashboard, Users, ShoppingCart, Settings } from 'lucide-react';

export const sidebarItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard, // Use o ícone do lucide-react
        href: "/dashboard",
    },
    {
        name: "Vendas",
        icon: ShoppingCart,
        href: "/vendas",
        // Links aninhados
        children: [
            { name: "Pedidos", href: "/vendas/pedidos" },
            { name: "Histórico", href: "/vendas/historico" },
            { name: "Relatórios", href: "/vendas/relatorios" },
        ]
    },
    {
        name: "Usuários",
        icon: Users,
        href: "/usuarios",
        children: [
            { name: "Listar", href: "/usuarios/lista" },
            { name: "Adicionar", href: "/usuarios/adicionar" },
        ]
    },
    {
        name: "Configurações",
        icon: Settings,
        href: "/configuracoes",
    },
];
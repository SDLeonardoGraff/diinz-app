"use client"; // Necessário para usar o hook usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { JSX } from "react"; // Necessário para usar React.Fragment

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// 1. Tipagem para o objeto de Breadcrumb
interface BreadcrumbCrumb {
  href: string;
  name: string;
  isLast: boolean;
}

// Mapeamento de nomes amigáveis para segmentos de rota
const ROUTE_NAMES: { [key: string]: string } = {
  // vendas: "Vendas",
  pedidos: "Pedidos",
  historico: "Histórico",
  relatorios: "Relatórios",
  // Adicione mais mapeamentos aqui conforme suas rotas
  // Ex: "configuracoes": "Configurações do Sistema"
};

export function BreadcrumbVendas(): JSX.Element { // Define o tipo de retorno
  // Obtém o caminho atual (ex: /vendas/pedidos/detalhe)
  const pathname: string = usePathname();

  // Remove a barra inicial e divide o caminho em segmentos. Tipado como string[]
  const segments: string[] = pathname.split('/').filter(segment => segment.length > 0);

  // 2. Mapeamento dos segmentos
  // Tipado como BreadcrumbCrumb[]
  const breadcrumbs: BreadcrumbCrumb[] = segments.map((segment: string, index: number) => {
    // Cria o caminho acumulado (ex: /vendas, /vendas/pedidos)
    const href: string = '/' + segments.slice(0, index + 1).join('/');

    // Usa o nome mapeado, ou capitaliza o segmento se não for mapeado
    const name: string = ROUTE_NAMES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    // Verifica se é o último segmento (a página atual)
    const isLast: boolean = index === segments.length - 1;

    return {
      href,
      name,
      isLast,
    };
  });

  if (breadcrumbs.length === 0) {
    // Retorna Breadcrumb simples para a raiz (/)
    return (
      <Breadcrumb>
        <BreadcrumbList className="text-white italic">
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // 3. Renderiza os Breadcrumbs
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-white italic">
        {/* Item Home Fixo */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Mapeia os segmentos dinâmicos */}
        {breadcrumbs.map((crumb: BreadcrumbCrumb) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast ? (
                // Se for o último, usa BreadcrumbPage
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                // Se não for o último, usa BreadcrumbLink
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {/* Adiciona o separador se não for o último item */}
            {!crumb.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
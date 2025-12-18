"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BreadcrumbVendas } from "../../../components/(breadcrumb)/Breadcrumb";
import { Input } from "@/components/ui/input";
import { ArrowUp10, CirclePlus, FunnelX, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TabelaVendas from "./_components/TabelaPedidos";
import Paginacao from "./_components/Paginacao";

interface ResponseDataVenda {
    vendas: any[];
    meta: {
        totalPedidos: number;
        totalPaginas: number;
    }
}

export default function Pedidos() {
    const [clienteFiltro, setClienteFiltro] = useState<string>("");
    const [statusFiltro, setStatusFiltro] = useState<string>("");
    const [codigoFiltro, setCodigoFiltro] = useState<number | null>(null);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(8);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const [totalVendas, setTotalVendas] = useState<number>(0);

    const params = useMemo(() => {
        const filtrosTratados: Record<string, string> = {};

        if (clienteFiltro) {
            filtrosTratados.cliente = clienteFiltro;
        }

        if (codigoFiltro !== null) {
            filtrosTratados.venda = codigoFiltro.toString();
        }

        if (statusFiltro) {
            filtrosTratados.status = statusFiltro;
        }

        if (page) {
            filtrosTratados.page = page.toString();
        }

        if (limit) {
            filtrosTratados.limit = limit.toString();
        }

        return new URLSearchParams(filtrosTratados);
    }, [clienteFiltro, codigoFiltro, statusFiltro, page, limit])

    const fetchPedidos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // A requisição vai para a sua API Route do Next.js
            const response = await fetch(`/api/pedidos?${params.toString()}`); 

            if (!response.ok) {
                // Se a API retornar 401 ou 403
                throw new Error(`Erro ao carregar pedidos: ${response.statusText}`);
            }

            const {vendas, meta}: ResponseDataVenda = await response.json();
            setPedidos(vendas);
            setTotalPaginas(meta.totalPaginas);
            setTotalVendas(meta.totalPedidos);

            console.log("pedidos", vendas);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar dados.");
            setPedidos([]);
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        // Dispara a busca quando o componente monta
        fetchPedidos(); 
    }, [fetchPedidos]);

    const limparFiltros = () => {
        setClienteFiltro("");
        setCodigoFiltro(null);
        setStatusFiltro("");
        setPage(1);
    };

    return (
        // p-4 em mobile e p-0 em sm: (dependendo do seu layout pai)
        <div className="w-full h-full space-y-8 p-4 sm:p-0"> 
            <BreadcrumbVendas />
            
            {/* Ajustei classes desnecessárias do main */}
            <main className="min-w-full flex flex-col px-0 sm:px-4 md:px-0"> 
                
                {/* 1. CONTAINER PRINCIPAL: flex-col em mobile e flex-row em telas md e acima */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                    
                    {/* 2. GRUPO DE FILTROS: flex-col em mobile (w-full), muda para flex-row em sm+ */}
                    <div className="flex items-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 w-full md:w-auto">
                        
                        {/* Filtro Cliente (Input) */}
                        <div className="relative w-full sm:w-auto sm:grow">
                            <Search 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#808080]"
                            />
                            <Input 
                                id="text"
                                type="text"
                                placeholder="Nome do cliente"
                                value={clienteFiltro}
                                onChange={(e) => setClienteFiltro(e.target.value)}
                                // w-full em mobile
                                className="pl-10 h-12 pr-10 bg-[#252222] border-[#161616] focus:border-[#58a547] focus:ring-[#58a547] text-white w-full"
                            />
                        </div>

                        {/* Filtro Código (Input) */}
                        <div className="relative w-full sm:w-32"> {/* Largura mais estreita para o código em telas sm */}
                            <ArrowUp10
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#808080]"
                            />
                            <Input 
                                id="codigo"
                                type="text"
                                placeholder="Ex:. 12"
                                value={codigoFiltro ? codigoFiltro : ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                        // Se o campo estiver vazio, define o estado como null
                                        setCodigoFiltro(null); 
                                    } else {
                                        // Se houver valor, converte para número
                                        setCodigoFiltro(Number(value)); 
                                    }
                                }}
                                className="pl-10 h-12 pr-10 bg-[#252222] border-[#161616] focus:border-[#58a547] focus:ring-[#58a547] text-white w-full"
                            />
                        </div>

                        {/* Filtro Status (Select) */}
                        <div className="relative w-full sm:w-56"> {/* Largura definida para o select */}
                            <Select
                                value={statusFiltro} 
                                onValueChange={setStatusFiltro}
                                >
                                <SelectTrigger className="w-full h-12 bg-[#252222] shadow-md text-white">
                                    <SelectValue placeholder="Status: Todos" />
                                </SelectTrigger>
                                <SelectContent 
                                    position="popper"
                                    className="bg-[#252222] text-white"
                                >
                                    <SelectItem value="all" className="hover:bg-[#4b4242] cursor-pointer">Todos</SelectItem>
                                    <SelectItem value="Orçamento" className="hover:bg-[#4b4242] cursor-pointer">Orçamento</SelectItem>
                                    <SelectItem value="Pedido" className="hover:bg-[#4b4242] cursor-pointer">Pedido</SelectItem>
                                    <SelectItem value="Pedido Não Faturado" className="hover:bg-[#4b4242] cursor-pointer">Pedido Não Faturado</SelectItem>
                                    <SelectItem value="Pedido Faturado" className="hover:bg-[#4b4242] cursor-pointer">Pedido Faturado</SelectItem>
                                    <SelectItem value="Pedido Aprovado Sem Faturamento" className="hover:bg-[#4b4242] cursor-pointer">
                                        Pedido Aprovado Sem Faturamento
                                    </SelectItem>
                                    <SelectItem value="Pedido Cancelado" className="hover:bg-[#4b4242] cursor-pointer">Pedido Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    {/* 3. GRUPO DE BOTÕES: flex-col em mobile (w-full), muda para flex-row em sm+ */}
                    {/* md:ml-auto empurra os botões para o canto direito em telas grandes */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto md:ml-auto">
                        <Button 
                            onClick={limparFiltros} 
                            // flex-1 faz com que os botões tenham largura igual em mobile
                            className="flex-1 sm:w-auto cursor-pointer py-6 font-medium text-[16px] bg-blue-400 hover:bg-blue-400/80 transition-colors duration-200">
                            <FunnelX className="mr-2 h-5 w-5" /> <span className="hidden sm:inline">Limpar </span>filtros
                        </Button>

                        <Button 
                            // onClick={navegar_novo_pedido} 
                            className="flex-1 sm:w-auto cursor-pointer py-6 font-medium text-[16px] bg-green-600 hover:bg-green-600/80 transition-colors duration-200">
                            <CirclePlus className="mr-2 h-5 w-5" /> Novo Pedido
                        </Button>
                    </div>
                </div>

                <div className="pt-4">
                    <TabelaVendas isLoading={isLoading} vendas={pedidos}/>
                </div>

                <Paginacao
                    page={page}
                    setPage={setPage}
                    totalPaginas={totalPaginas}
                    totalVendas={totalVendas}
                />
            </main>
        </div>
    )
}
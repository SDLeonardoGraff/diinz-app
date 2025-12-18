import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DadosTab from "./(tabs)/Dados";
import ItensTab from "./(tabs)/Itens";
import PagamentosTab from "./(tabs)/Pagamentos";


export default function TabsPedido({venda}: {venda: any}) {
    let gridColsClass = "grid-cols-4";
    const [temOrdemServico, setTemOrdemServico] = useState<boolean>(false); // Simulação de condição
    
    if (!temOrdemServico) {
        gridColsClass = "grid-cols-3";
    }

    const dados = {
        cliente: venda.Cliente,
        cliente_id: venda.ClienteId,
        empresa: venda.Empresa,
        categoria_venda: venda.VendaCategoria,
        categoria_venda_id: venda.VendaCategoriaID,
        origem_venda: venda.OrigemVenda,
        tabela_preco: venda.TabelaDePreco,
        tabela_preco_id: venda.TabelaDePrecoId,
        deposito: venda.Deposito,
        deposito_id: venda.DepositoID,
        vendedor: venda.Vendedor,
        vendedor_id: venda.VendedorID,
        validade: venda.Validade,
        codigo: venda.Codigo,
        numero_nfe: venda.NumeroNFe,
    };

    return (
        <Tabs defaultValue="dados" className="w-full">
            <TabsList className={cn("grid w-full space-x-1", gridColsClass)}>
                <TabsTrigger value="dados" className="cursor-pointer bg-gray-800 text-white transition-all duration-200 hover:bg-black hover:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white font-sans">Dados</TabsTrigger>
                {temOrdemServico && (
                    <TabsTrigger value="ordem_servico" className="cursor-pointer bg-gray-800 text-white transition-all duration-200 hover:bg-black hover:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white font-sans">Ordem de Serviço</TabsTrigger>
                )}
                <TabsTrigger value="itens" className="cursor-pointer bg-gray-800 text-white transition-all duration-200 hover:bg-black hover:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white font-sans">Itens</TabsTrigger>
                <TabsTrigger value="pagamentos" className="cursor-pointer bg-gray-800 text-white transition-all duration-200 hover:bg-black hover:text-white data-[state=active]:bg-green-700 data-[state=active]:text-white font-sans">Pagamentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados">
                {/* Conteúdo da aba Dados */}
                <DadosTab dados={dados} />
            </TabsContent>

            <TabsContent value="ordem_servico">
                {/* Conteúdo da aba Ordem de Serviço */}
            </TabsContent>

            <TabsContent value="itens">
                {/* Conteúdo da aba Itens */}
                <ItensTab />
            </TabsContent>

            <TabsContent value="pagamentos">
                {/* Conteúdo da aba Pagamentos */}
                <PagamentosTab />
            </TabsContent>
        </Tabs>
    );
}

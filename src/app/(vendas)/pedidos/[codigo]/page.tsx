"use client";

import { BreadcrumbVendas } from "@/components/(breadcrumb)/Breadcrumb";
import { FieldContainer } from "@/components/FieldContainer";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Col6Classes } from "@/lib/classeStyles";
import { Ban, ChevronLeft, FilePlusCorner, Newspaper, Printer, ReceiptText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import TabsPedido from "./_components/TabsPedido";
import { useVenda } from "@/hooks/useVenda";
import { Badge } from "@/components/ui/badge";
import { statusColors } from "@/lib/vendaStatus";

export default function PedidosCodigoPage() {
    
    const params = useParams();
    if (!params.codigo || Array.isArray(params.codigo)) {
        throw new Error("Código inválido");
    }
    const router = useRouter();
    const { venda, loading, error } = useVenda(params.codigo); // Substitua por sua lógica de fetch de dados usando params.codigo

    if (loading) return <p>Carregando venda...</p>;
    if (error) return <p>Erro: {error}</p>;

    const hasNFe= !!venda?.venda?.NumeroNFe;
    const hasBoleto = !!venda?.venda?.NumeroNFe;

    return (
        <div className="w-full h-full space-y-8 sm:p-0">
            <BreadcrumbVendas />
            <div className="flex items-center justify-between">

                <div className="flex space-x-14 items-center">
                    <Button variant="default" size="lg" className="bg-green-500 cursor-pointer shadow-md" onClick={() => router.back()}>
                        <ChevronLeft />Voltar
                    </Button>
                </div>

                <div className="space-x-6">
                    <Badge className={`${statusColors[venda.venda.Status] || ""} p-2`}>
                    {venda.venda.Status}
                    </Badge>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" size="lg" className="bg-[#161616] text-white cursor-pointer">
                                Mais Ações
                            </Button>
                        </DropdownMenuTrigger>
                
                        <DropdownMenuContent align="end" className="bg-gray-800 p-2">
                            <DropdownMenuItem className="cursor-pointer bg-[#222222] text-white hover:text-green-500 transition-colors duration-200">
                                <Printer />
                                Imprimir Pedido
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-blue-500 mx-2 my-2"/> 

                            {
                                hasNFe ? (
                                    <DropdownMenuItem className="cursor-pointer bg-[#222222] text-white hover:text-green-500 transition-colors duration-200">
                                        <Printer />Imprimir NF-e
                                    </DropdownMenuItem>
                                    ) : (
                                    <DropdownMenuItem className="cursor-pointer bg-[#222222] text-white hover:text-green-500 transition-colors duration-200">
                                        <Newspaper />Gerar NF-e
                                    </DropdownMenuItem>
                                )
                            }
                            {/* <DropdownMenuSeparator className="bg-blue-500 mx-2 my-2"/>  */}
                            
                            <DropdownMenuSeparator className="bg-blue-500 mx-2 my-2"/> 

                        {hasBoleto ? (
                                <DropdownMenuItem className="cursor-pointer bg-[#222222] text-white hover:text-green-500 transition-colors duration-200">
                                    <Printer />
                                    Imprimir Boleto
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem className="cursor-pointer bg-[#222222] text-white hover:text-green-500 transition-colors duration-200">
                                    <FilePlusCorner />
                                    Gerar Boleto
                                </DropdownMenuItem>
                            )
                        }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
            </div>
            
            <main className="w-full flex flex-col px-0 sm:px-4 md:px-0 text-white">
                {/* <FieldContainer className={Col6Classes}>
                    <Label htmlFor="cliente">Nome Fantasia</Label>
                    <Input 
                        type="text" 
                        id="cliente"
                        placeholder="Empresa de Emissão" 
                        value={"Bom Paladar Ltda."}
                        readOnly
                        className="bg-gray-800 text-white"
                    />
                </FieldContainer> */}

                <TabsPedido venda={venda.venda} />
            </main>
        </div>
    );
}
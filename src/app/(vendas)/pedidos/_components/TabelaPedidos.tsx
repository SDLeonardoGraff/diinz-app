"use client";

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CircleCheck, CircleDollarSign, CircleX, User } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format_currency";

interface ListaVendasProps {
 vendas: any[];
 isLoading: boolean;
}

const TabelaVendas = ({ vendas, isLoading }: ListaVendasProps) => {
 const skeletonArray = Array(8).fill(0);

 const router = useRouter();

 const statusColors: Record<string, string> = {
  "Orçamento": "bg-gray-500 text-white hover:bg-gray-600",
  "Pedido": "bg-blue-600 text-white hover:bg-blue-700",
  "Pedido Não Faturado": "bg-orange-500 text-white hover:bg-orange-600",
  "Pedido Faturado": "bg-green-500 text-white hover:bg-green-600",
  "Pedido Aprovado Sem Faturamento": "bg-yellow-400 text-gray-800 hover:bg-yellow-500",
  "Pedido Cancelado": "bg-red-600 text-white hover:bg-red-700",
 };

 if (isLoading) {
  return (
   <div className="flex flex-col gap-4">
    {skeletonArray.map((_, i) => (
     <SkeletonRow key={i} />
    ))}
   </div>
  );
 }

 if (vendas.length === 0) {
  return <p className="text-white bg-[#252222] border-[#161616] text-center py-10 border rounded-lg shadow-sm">Nenhum pedido encontrado.</p>; }

 return (
  <div className="overflow-x-auto border rounded-lg shadow-sm">
   <Table className="bg-[#252222] min-w-full">
    <TableHeader>
     <TableRow className="bg-[#161616] hover:bg-[#161616] border-b-2 border-[#161616]">
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white">Código</TableHead>
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white">Cliente</TableHead>
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">Data</TableHead>
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-right text-white">Valor</TableHead>
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white">Status</TableHead>
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white">Depósito</TableHead>
      {/* Alinhamento centralizado no cabeçalho */}
      <TableHead className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-white text-center w-20">NF-e</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {vendas.map((pedido) => (
      <TableRow 
        key={pedido._id} 
        className="border-b transition-colors duration-150 ease-in-out hover:bg-blue-50/50 cursor-pointer"
        onClick={() => router.push(`/vendas/${pedido.Codigo}`)}
        >
       {/* Código: Alinhado à esquerda (padrão) */}
       <TableCell className="px-4 py-5 font-medium text-white">{pedido.Codigo}</TableCell>
       
       {/* Cliente: Ícone e texto alinhados à esquerda (flex items-center) */}
       <TableCell className="px-4 py-5 flex items-center gap-2 text-white">
        <User className="w-4 h-4 text-blue-400" /> 
        {pedido.Cliente}
       </TableCell>
       
       {/* Data: Ajuste de alinhamento para esquerda (removido justify-end) e nowrap */}
       <TableCell className="px-4 py-5 text-sm text-white whitespace-nowrap">
        <div className="flex items-center gap-2"> {/* Removido justify-end */}
          <CalendarDays className="w-4 h-4 text-gray-400"/>
          {moment(pedido.Data).format("DD/MM/YYYY HH:mm")}
        </div>
       </TableCell>
       
       {/* Valor: Alinhado à direita (text-right e justify-end) */}
       <TableCell className="px-4 py-5 text-right text-white font-semibold">
        <div className="flex items-center justify-end gap-2">
         <CircleDollarSign className="w-4 h-4 text-green-400" /> 
         {formatCurrency(pedido.ValorFinal)}
        </div>
       </TableCell>
       
       {/* Status: Alinhado à esquerda (padrão) */}
       <TableCell className="px-4 py-5">
        <Badge className={`${statusColors[pedido.Status] || ""} text-xs font-medium px-3 py-1 rounded-full transition-colors`}>{pedido.Status}</Badge>
       </TableCell>
       
       {/* Depósito: Alinhado à esquerda (padrão) */}
       <TableCell className="px-4 py-5 text-sm text-white">{pedido.Deposito}</TableCell>
       
       {/* Impresso Danfe ?: Corrigido o alinhamento para centro (text-center e mx-auto no ícone) */}
       <TableCell className="px-4 py-5 text-center text-white">
        {/* {pedido.ImpressoDanfe ? (
         <CircleCheck className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
         <CircleX className="w-5 h-5 text-red-500 mx-auto"/>
        )} */}
        {pedido.NumeroNFe}
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 );
};

// Skeleton para loading: Ajustado para ter 7 elementos
const SkeletonRow = () => (
 <div className="animate-pulse bg-[#161616] rounded-lg flex gap-4 py-5 px-4 border-b border-gray-100 items-center">
  <div className="h-6 w-12 bg-gray-400 rounded"></div> {/* Código */}
  <div className="h-6 w-40 bg-gray-400 rounded"></div> {/* Cliente */}
  <div className="h-6 w-32 bg-gray-400 rounded"></div> {/* Data */}
  <div className="h-6 w-24 bg-gray-400 rounded"></div> {/* Valor */}
  <div className="h-6 w-28 bg-gray-400 rounded"></div> {/* Status */}
  <div className="h-6 w-24 bg-gray-400 rounded"></div> {/* Depósito */}
  <div className="h-6 w-12 bg-gray-400 rounded"></div> {/* Danfe */}
 </div>
);

export default TabelaVendas;
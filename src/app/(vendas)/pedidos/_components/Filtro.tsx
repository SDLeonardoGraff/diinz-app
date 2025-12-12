import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CirclePlus } from "lucide-react";

interface IFiltroProps {
    filtroCliente: string;
    setFiltroCliente: (value: string) => void;
    filtroCodigo: string;
    setFiltroCodigo: (value: string) => void;
    filtroStatus: string;
    setFiltroStatus: (value: string) => void;
    limparFiltro: () => void;
    navegar_novo_pedido: () => void;
}

const Filtro = ({ filtroCliente, setFiltroCliente, filtroCodigo, setFiltroCodigo, filtroStatus, setFiltroStatus, limparFiltro, navegar_novo_pedido }: IFiltroProps) => {
    return (
        <div className="flex flex-wrap gap-4 items-end mb-6 mt-6">
        <div className="flex flex-row gap-2 items-center">
          <label className="text-sm font-medium">Cliente</label>
          <Input
            placeholder="Buscar por cliente..."
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
            className="w-60 bg-white shadow-md"
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <label className="text-sm font-medium">Código</label>
          <Input
            placeholder="Ex: 12"
            value={filtroCodigo}
            onChange={(e) => setFiltroCodigo(e.target.value)}
            className="w-32 bg-white shadow-md"
          />
        </div>

        <div className="flex flex-row gap-4 items-center">
                <label className="text-sm font-medium">Status</label>
                <Select 
                    value={filtroStatus} 
                    onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-40 bg-white shadow-md">
                    <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Orçamento">Orçamento</SelectItem>
                    <SelectItem value="Pedido">Pedido</SelectItem>
                    <SelectItem value="Pedido Não Faturado">Pedido Não Faturado</SelectItem>
                    <SelectItem value="Pedido Faturado">Pedido Faturado</SelectItem>
                    <SelectItem value="Pedido Aprovado Sem Faturamento">
                        Pedido Aprovado Sem Faturamento
                    </SelectItem>
                    <SelectItem value="Pedido Cancelado">Pedido Cancelado</SelectItem>
                    </SelectContent>
                </Select>
            <Button 
                onClick={limparFiltro} 
                className="cursor-pointer">
                Limpar filtros
            </Button>

             <Button 
                onClick={navegar_novo_pedido} 
                className="cursor-pointer ml-10 font-bold text-xl bg-green-600 hover:bg-green-600/80 transition-colors duration-200">
                Novo <CirclePlus />
            </Button>
        </div>
      </div>
    )
}

export default Filtro;
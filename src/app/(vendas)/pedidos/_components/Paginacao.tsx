import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    page: number;
    totalPaginas: number;
    totalVendas: number;
    setPage: (value: number) => void;
}

export default function Paginacao({ page, setPage, totalPaginas, totalVendas }: Props) {
    return (
        <div className="flex flex-col items-center gap-3 mt-6 mb-6">
            <p className="text-sm text-white">
            Página {page} de {totalPaginas} — {totalVendas} registros encontrados
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
                <Button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className="bg-[#161616] hover:bg-[#222222] transition-colors duration-200 text-white cursor-pointer"
                >
                    « Primeiro
                </Button>

                <Button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="bg-[#161616] hover:bg-[#222222] transition-colors duration-200 text-white cursor-pointer"
                >
                    ‹ Anterior
                </Button>

                <Input
                    placeholder="Nº"
                    type="text"
                    value={page}
                    min={1}
                    max={totalPaginas}
                    onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (!isNaN(value) && value >= 1 && value <= totalPaginas) {
                        setPage(value)
                        }}
                    }
                    className="w-30 bg-[#161616] text-white shadow-md text-center"
                />

                <Button
                    variant="default"
                    onClick={() => setPage(Math.min(totalPaginas, page + 1))}
                    disabled={page === totalPaginas}
                    className="bg-[#161616] hover:bg-[#222222] transition-colors duration-200 text-white cursor-pointer"
                >
                    Próxima ›
                </Button>

                <Button
                    variant="default"
                    onClick={() => setPage(totalPaginas)}
                    disabled={page === totalPaginas}
                    className="bg-[#161616] hover:bg-[#222222] transition-colors duration-200 text-white cursor-pointer"
                >
                    Último »
                </Button>
            </div>
        </div>
    )
}
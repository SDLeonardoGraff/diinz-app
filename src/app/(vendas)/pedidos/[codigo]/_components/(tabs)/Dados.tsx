import { FieldContainer } from "@/components/FieldContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Col3Classes, Col4Classes } from "@/lib/classeStyles";
import moment from "moment";

export default function DadosTab({ dados }: { dados: any }) {
    return (
        <div className="flex flex-wrap items-end gap-x-6 gap-y-8 mt-5">
            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Cliente</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Cliente..." 
                    value={dados.cliente}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>

            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Empresa</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Empresa..." 
                    value={dados.empresa}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>


            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Categoria da Venda</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Categoria da Venda..." 
                    value={dados.categoria_venda}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>

            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Origem da Venda</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Origem da Venda..." 
                    value={dados.origem_venda}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>

            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Tabela de Preços</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Tabela de Preços..." 
                    value={dados.tabela_preco}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>
            <FieldContainer className={Col3Classes}>
                <Label htmlFor="cliente">Depósito</Label>
                <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Depósito..." 
                    value={dados.deposito}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
            </FieldContainer>

            <FieldContainer className={Col3Classes}>
                    <Label htmlFor="vendedor">Vendedor</Label>
                    <Input 
                    type="text" 
                    id="cliente"
                    placeholder="Vendedor..." 
                    value={dados.vendedor}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                />
                </FieldContainer>

                <FieldContainer className={Col3Classes}>
                    <Label htmlFor="codigo">Código</Label>
                    <Input 
                        type="text" 
                        id="cliente"
                        placeholder="Código..." 
                        value={dados.codigo}
                        readOnly
                        className="bg-gray-800 font-sans text-white"
                    />
                </FieldContainer>

                <FieldContainer className={Col3Classes}>
                    <Label htmlFor="cliente">Data de Validade</Label>
                    <Input 
                    type="datetime"
                    id="cliente"
                    placeholder="Cliente" 
                    value={moment(dados.validade).format("DD/MM/YYYY HH:mm")}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                    />
              </FieldContainer>

              <FieldContainer className={Col3Classes}>
                    <Label htmlFor="cliente">Número NFe</Label>
                    <Input 
                    type="text"
                    id="cliente"
                    placeholder="Número NFe..." 
                    value={dados.numero_nfe}
                    readOnly
                    className="bg-gray-800 font-sans text-white"
                    />
              </FieldContainer>
        </div>
    );
}
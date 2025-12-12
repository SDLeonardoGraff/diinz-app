// utils/monetario.js
export function monetarioParaNumero(valor: string) {
  if (!valor) return 0;
  const numero = valor.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
  return parseFloat(numero);
}

export function formatCurrency(valor: number) {
  if (isNaN(valor)) return 'R$ 0,00';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

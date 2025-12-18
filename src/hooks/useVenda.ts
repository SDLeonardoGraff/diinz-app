// src/hooks/useVenda.ts
import { useState, useEffect } from "react";

interface Venda {
  id: string;
  valor: number;
  cliente: string;
  // adicione outros campos que sua API retorna
}

export function useVenda(codigo: string) {
  const [venda, setVenda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!codigo) return;

    setLoading(true);
    setError(null);

    fetch(`/api/pedidos/${codigo}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar venda");
        return res.json();
      })
      .then(data => setVenda(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [codigo]);

  return { venda, loading, error };
}

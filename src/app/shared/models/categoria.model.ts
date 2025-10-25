// categoria.model.ts
export interface Categoria {
  id?: number;           // Para o frontend usar
  id_categoria?: number; // Se o backend retorna assim
  nome: string;
  descricao: string;
  ativo?: boolean;
  dataCriacao?: string;
  dataAtualizacao?: string;
}


/** Estrutura esperada de resposta da API */
export interface CategoriasResponse {
  data: {
    categorias: Categoria[];
  };
}

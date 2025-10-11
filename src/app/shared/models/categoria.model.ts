export interface Categoria {
    id?: number;
    nome: string;
    descricao: string;
    dataCriacao?: string;
    dataAtualizacao?: string;
  }
  
  /** Estrutura esperada de resposta da API */
  export interface CategoriasResponse {
    data: {
      categorias: Categoria[];
    };
  }
  
export interface RegiaoEntrega {
  id_regiao?: number;
  nome: string;
  preco: number;
  ativo?: boolean; 
}

export interface RegioesResponse {
  errorMessages: string[];
  hasErrors: boolean;
  message: string;
  statusCode: number;
  data: {
    regioes: RegiaoEntrega[];
    paginacao: any;
  };
}
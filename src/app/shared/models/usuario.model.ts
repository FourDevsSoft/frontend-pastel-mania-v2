export interface Usuario {
  id_usuario?: string;       
  nome_completo: string;
  email: string;
  funcao: number;           
  ativo?: boolean;
  criado_em?: string;        
  senha?: string;           
}

export interface ApiResponse {
  errorMessages: string[];
  hasErrors: boolean;
  message: string;
  statusCode: number;
  data: Usuario[];
  pagination:any
}

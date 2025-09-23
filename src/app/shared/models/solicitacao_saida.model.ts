import { Turma } from "./turma.model";

export interface Solicitacao_Saida {
  id?: number;
  id_responsavel?: number;
  id_portao?: number;
  status?: string,
  portao_nome?: string,
  portao_cor?: string,
  created_at?: string,
  solicitacao_id?: number,
  id_aluno?: number,
  aluno?: AlunoEnvio;  // objeto único, não array
}

export interface AlunoEnvio {
  id_aluno: number;
}

export interface ApiAlunoResponse {
  conteudoJson: {
    turmas: Turma;
    solicitacoes: Solicitacao_Saida[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: string;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  success: boolean;
}

export interface AlunoEnvio {
  id: number;
  nome: string;
  ativo: boolean;
  is_emergency: boolean;
}
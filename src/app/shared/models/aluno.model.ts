import { Responsavel } from "./responsavel.model";

export interface Aluno {
  id?: number;
  id_aluno?: number;
  nome: string;
  id_turma: number;
  is_temporario: boolean;
  is_freepass: boolean;
  observacoes?: string;
  data_inicio: string;
  data_fim: string;
  file?: File | null;
  turma_nome?: string;
  tipo_vinculo?: string;
}

export interface ApiAlunoResponse {
  conteudoJson: {
    students: Aluno[];
    responsaveis:Responsavel[];
    pagination: any;
  };
  success: boolean;
}

export interface ApiAlunoPorIdResponse {
  conteudoJson: Aluno;
  success: boolean;
}

export interface AlunoComResponsaveis {
  id_aluno: number;
  nome_aluno: string;
  responsaveis: Responsavel[];
}

export interface ApiAlunosComResponsaveisResponse {
  conteudoJson: AlunoComResponsaveis[];
  success: boolean;
}

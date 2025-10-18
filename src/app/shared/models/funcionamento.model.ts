// src/app/shared/models/funcionamento.model.ts

/** Modelo de um horário de funcionamento */
export interface HorarioFuncionamento {
    dia_semana_id: number;
    hora_abertura: string;
    hora_fechamento: string;
    ativo: boolean;
  }
  
  /** Resposta com múltiplos horários */
  export interface HorariosResponse {
    horarios_funcionamento: HorarioFuncionamento[];
  }
  
  /** Estrutura genérica padrão da API */
  export interface ApiResponse<T> {
    errorMessages: string[];
    hasErrors: boolean;
    message: string;
    statusCode: number;
    data: T;
  }
  
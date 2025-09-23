
export interface dashboardCards {
  conteudoJson: {
      total_turmas: number;
      total_salas: number;
      total_alunos: number;
      total_professores: number;
      total_coordenadores: number;
      total_media:number;
      total_responsaveis:number;
  };
  success: boolean;
}


export interface DashboardGraficoProfessores {
  conteudoJson: {
    mediasPorUsuario: {
      nome_completo: string;
      media_minutos: string;
    }[];
  };
  success: boolean;
}

export interface DashboardGraficoMeses {
  conteudoJson: {
    resultado: {
      mes: string;
      media_minutos: string;
    }[];
  };
  success: boolean;
}

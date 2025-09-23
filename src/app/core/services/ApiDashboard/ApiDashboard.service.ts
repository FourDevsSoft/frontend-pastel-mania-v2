import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { dashboardCards, DashboardGraficoProfessores, DashboardGraficoMeses } from '../../../shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ApiDashboardService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/solicitacao-saida`;
  }

  listarDadosCards(): Observable<dashboardCards> {
    return this.http.get<dashboardCards>(`${this.globalService.apiUrl}/homebox`, {
      withCredentials: true
    });
  }

  listarDoRankingProfessor(): Observable<DashboardGraficoProfessores> {
    return this.http.get<DashboardGraficoProfessores>(`${this.globalService.apiUrl}/ranking?orderBy=asc`, {
      withCredentials: true
    });
  }

  listarDadosMeses(): Observable<DashboardGraficoMeses> {
    return this.http.get<DashboardGraficoMeses>(`${this.globalService.apiUrl}/avg-month`, {
      withCredentials: true
    });
  }

}

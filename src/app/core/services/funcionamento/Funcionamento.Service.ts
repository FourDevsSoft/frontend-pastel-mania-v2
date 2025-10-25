import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { GlobalService } from '../global.service';
import { HorarioFuncionamento, HorariosResponse, ApiResponse } from '../../../shared/models/funcionamento.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionamentoService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/horarios-funcionamento`;
  }

  /** Buscar todos os horários */
  getAll(): Observable<HorarioFuncionamento[]> {
    return this.http.get<ApiResponse<HorariosResponse>>(this.apiUrl, { withCredentials: true }).pipe(
      map(res => res.data.horarios_funcionamento),
      catchError(err => throwError(() => err.error || err))
    );
  }

  /** Buscar horário por dia da semana */
  getByDia(dia: number): Observable<HorarioFuncionamento> {
    return this.http.get<ApiResponse<HorarioFuncionamento>>(`${this.apiUrl}/${dia}`, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  /** Criar um horário individual */
  create(horario: HorarioFuncionamento): Observable<HorarioFuncionamento> {
    return this.http.post<ApiResponse<HorarioFuncionamento>>(this.apiUrl, horario, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  /** Criar ou atualizar vários horários */
  createLote(horarios: HorarioFuncionamento[]): Observable<HorarioFuncionamento[]> {
    return this.http.post<ApiResponse<HorariosResponse>>(
      `${this.apiUrl}/lote`,
      { horarios_funcionamento: horarios },
      { withCredentials: true }
    ).pipe(
      map(res => res.data.horarios_funcionamento),
      catchError(err => throwError(() => err.error || err))
    );
  }

  /** Atualizar horário de um dia */
  update(dia: number, horario: HorarioFuncionamento): Observable<HorarioFuncionamento> {
    return this.http.put<ApiResponse<HorarioFuncionamento>>(`${this.apiUrl}/${dia}`, horario, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  /** Deletar horário de um dia */
  delete(dia: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${dia}`, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
  }
}

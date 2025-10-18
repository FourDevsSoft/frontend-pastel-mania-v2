import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { RegiaoEntrega } from '../../../shared/models/regiao.model';
import { GlobalService } from '../../services/global.service';

// Tipagem para resposta padrão da API
export interface ApiResponse<T> {
  errorMessages: string[];
  hasErrors: boolean;
  message: string;
  statusCode: number;
  data: T;
}

// Tipagem para a lista de regiões dentro do data
export interface RegioesResponse {
  regioes: RegiaoEntrega[];
}

@Injectable({
  providedIn: 'root'
})
export class RegiaoService {

  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/regioes`;
  }

  // Buscar todas regiões com busca e paginação
  getAll(search?: string, paginaAtual: number = 1, itensPorPagina: number = 10): Observable<RegiaoEntrega[]> {
    let url = `${this.apiUrl}?paginaAtual=${paginaAtual}&itensPorPagina=${itensPorPagina}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    return this.http.get<ApiResponse<RegioesResponse>>(url, { withCredentials: true }).pipe(
      map(res => res.data.regioes),
      catchError(err => throwError(() => err.error || err))
    );
  }

  // Buscar uma região pelo ID
  getById(id: number): Observable<RegiaoEntrega> {
    return this.http.get<ApiResponse<RegiaoEntrega>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  // Criar nova região
  create(regiao: RegiaoEntrega): Observable<RegiaoEntrega> {
    return this.http.post<ApiResponse<RegiaoEntrega>>(this.apiUrl, regiao, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  // Atualizar região existente
  update(id: number, regiao: RegiaoEntrega): Observable<RegiaoEntrega> {
    return this.http.put<ApiResponse<RegiaoEntrega>>(`${this.apiUrl}/${id}`, regiao, { withCredentials: true }).pipe(
      map(res => res.data),
      catchError(err => throwError(() => err.error || err))
    );
  }

  // Deletar região
  delete(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
  }
}

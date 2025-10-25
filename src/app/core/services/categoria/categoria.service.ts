import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Categoria, CategoriasResponse } from '../../../shared/models/categoria.model';
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl: string;

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.apiUrl = `${this.globalService.apiUrl}/categorias`;
  }

  getAll(search?: string): Observable<Categoria[]> {
    let url = this.apiUrl + '?paginaAtual=1&itensPorPagina=300';
    if (search) url += `?search=${encodeURIComponent(search)}`;
  
    // Removendo qualquer limitação de quantidade
    return this.http.get<CategoriasResponse>(url, { withCredentials: true }).pipe(
      map(res => res.data.categorias), // Retorna todas as categorias sem limitação
      catchError(err => throwError(() => err.error || err))
    );
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
  }

  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
  }

  updateOrdem(ordem: { categorias: { id_categoria: number; ordem: number }[] }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ordem`, ordem, { withCredentials: true }).pipe(
      catchError(err => throwError(() => err.error || err))
    );
}


}

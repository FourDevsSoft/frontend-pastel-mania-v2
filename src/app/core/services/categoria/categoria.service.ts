import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categoria, CategoriasResponse } from '../../../shared/models/categoria.model';
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/category`;
  }

  /** 🔹 Lista todas as categorias */
  getAll(search?: string): Observable<Categoria[]> {
    let url = this.apiUrl;
    if (search) url += `?search=${encodeURIComponent(search)}`;
    return this.http.get<CategoriasResponse>(url).pipe(
      map(res => res.data.categorias)
    );
  }

  /** 🔹 Cria nova categoria */
  create(categoria: Categoria): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }

  /** 🔹 Atualiza uma categoria existente */
  update(id: number, categoria: Categoria): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoria);
  }

  /** 🔹 Exclui uma categoria */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

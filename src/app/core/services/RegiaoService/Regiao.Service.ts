import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface RegiaoEntrega {
  id_regiao?: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

interface ListagemRegioesResponse {
  errorMessages: string[];
  hasErrors: boolean;
  message: string;
  statusCode: number;
  data: {
    regioes: RegiaoEntrega[];
    paginacao: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegiaoService {
  private apiUrl = 'https://apiv2.pastelmania23.com.br/api/regioes';

  constructor(private http: HttpClient) {}

  getAll(search?: string): Observable<RegiaoEntrega[]> {
    let url = this.apiUrl;
    if (search) url += `?search=${encodeURIComponent(search)}`;
    return this.http.get<ListagemRegioesResponse>(url).pipe(
      map(res => res.data.regioes)
    );
  }

  create(regiao: RegiaoEntrega): Observable<any> {
    return this.http.post(this.apiUrl, regiao);
  }

  update(id: number, regiao: RegiaoEntrega): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, regiao);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

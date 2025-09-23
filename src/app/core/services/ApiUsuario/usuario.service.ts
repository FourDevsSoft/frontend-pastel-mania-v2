import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, ApiResponse } from '../../../shared/models/usuario.model';
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/Usuarios`;
  }

  listar(pagina: number = 1, limit: number = 2): Observable<ApiResponse> {
    // return this.http.get<ApiResponse>(` ${this.apiUrl}?page=${pagina}&limit=${limit}`, {
    //   withCredentials: true
    // });
     return this.http.get<ApiResponse>(` ${this.apiUrl}`, {
       withCredentials: true
     });
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/`, usuario, { withCredentials: true });
  }

  atualizar(id: string, usuario: Omit<Usuario, 'id_usuario'>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { withCredentials: true });
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  buscarPorTermo(termo: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.globalService.apiUrl}/users?search=${encodeURIComponent(termo)}`, {
      withCredentials: true
    });
    
  }
  
}

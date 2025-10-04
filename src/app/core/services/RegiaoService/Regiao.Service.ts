import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RegiaoEntrega, RegioesResponse } from '../../../shared/models/regiao.model';
import { GlobalService } from '../../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RegiaoService {

  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = `${this.globalService.apiUrl}/regioes`;
  }
  
  getAll(search?: string): Observable<RegiaoEntrega[]> {
    let url = this.apiUrl;
    if (search) url += `?search=${encodeURIComponent(search)}`;
    return this.http.get<RegioesResponse>(url).pipe(
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { RedefinirSenhaRequest } from '../../../shared/models/RedefinirSenhaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRedefinirSenhaService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = this.globalService.apiUrl + '/password/reset?'; // ajuste conforme o endpoint real
  }

  redefinirSenha(payload: RedefinirSenhaRequest, token: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/reset-password?token=${token}`;
    return this.http.post(url, payload, {
      responseType: 'json',
      withCredentials: true
    });
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GlobalService } from '../../services/global.service';
import { generateKey } from '../../../utils/crypto-util'; // deve retornar { key, timestamp }

export interface RedefinirSenhaResponse {
  conteudoJson: {
    message: string;
  };
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = this.globalService.apiUrl + '/Usuarios/Login';
  }

  login(email: string, password: string, recaptchaToken: string): Observable<any> {
    const timestamp = new Date().toISOString();

    return from(generateKey(timestamp)).pipe(
      switchMap(key => {
        const loginData = {
          email: email,
          senha: password,
          recaptcha_token: recaptchaToken,
          timestamp: timestamp,
          key: key
        };

        return this.http.post<any>(this.apiUrl, loginData, {
          responseType: 'json',
          withCredentials: true
        });
      })
    );
  }

  redefinirSenha(email: string, dtNascimento: string): Observable<RedefinirSenhaResponse> {
    const timestamp = new Date().toISOString();

    return from(generateKey(timestamp)).pipe(
      switchMap(key => {
        const body = {
          matricula: email,
          dtNascimento: dtNascimento,
          key: key
        };

        return this.http.post<RedefinirSenhaResponse>(`${this.apiUrl}/redefinir-senha`, body, {
          responseType: 'json',
          withCredentials: true
        });
      })
    );
  }
}

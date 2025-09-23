import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';
import { esqueciSenhaResponse } from '../../../shared/models/EsqueciSenhaResponse.model'; // ajuste o caminho conforme seu projeto

@Injectable({
  providedIn: 'root'
})
export class ApiEsqueciSenhaService {
  private apiUrl: string;

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.apiUrl = this.globalService.apiUrl + '/password/request';
  }

  esqueciSenha(Email: string, RecaptchaToken: string): Observable<esqueciSenhaResponse> {
    const payload = { Email, RecaptchaToken };
    return this.http.post<esqueciSenhaResponse>(this.apiUrl, payload, {
      responseType: 'json',
      withCredentials: true
    });
  }

}

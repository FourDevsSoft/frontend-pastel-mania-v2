import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiLoginService } from '../../../core/services/ApiLogin/ApiLogin.service';
import { GlobalService } from '../../../core/services/global.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  senha: string = '';
  siteKey: string = '';
  mensagem: string = '';
  mensagemErro: string = '';
  mostrarSenha: boolean = false;
  respostaApi: any = null;
  carregando: boolean = false;

  constructor(
    private apiLoginService: ApiLoginService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.siteKey = this.globalService.siteKey;

    if (localStorage.getItem('isAuthentication')) {
      this.router.navigate(['/adm/dashboard']);
    }
  }

  ngAfterViewInit() {
    this.loadRecaptcha();
  }

  loadRecaptcha() {
    const scriptId = 'recaptcha-v3-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  togglePassword() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onLogin() {
    this.mensagem = '';
    this.mensagemErro = '';
    this.respostaApi = null;
    this.carregando = true;
  
    if (!this.email || !this.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      this.carregando = false;
      return;
    }
  
    grecaptcha.ready(() => {
      grecaptcha.execute(this.siteKey, { action: 'login' }).then((token: string) => {
        this.apiLoginService.login(this.email, this.senha, token).subscribe(
          (response) => {
            this.mensagem = 'Login bem-sucedido!';
            this.respostaApi = response;

  
            const nomeUsuario = this.respostaApi.data.nome;
            const funcaoUsuario = this.respostaApi.data.funcao;
            const tempoExpiracaoUsuario = this.respostaApi.data.expira_em;

            if (nomeUsuario) {
              localStorage.setItem('isAuthentication', "true");
              localStorage.setItem('nomeUsuario', nomeUsuario);
              localStorage.setItem('funcaoUsuario', funcaoUsuario);
              localStorage.setItem('tempoExpiracaoUsuario', tempoExpiracaoUsuario);
  
              this.router.navigate(['/adm/dashboard']);
            }
  
            this.carregando = false;
          },
          (error) => {
            console.log('Erro da API:', error.error);
            this.mensagemErro = error.error?.message || 'Erro desconhecido';
            this.carregando = false;
          }
        );
      });
    });
  }
  
}

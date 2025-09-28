import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ApiEsqueciSenhaService } from '../../../core/services/ApiEsqueciSenha/ApiEsqueciSenha.service';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { AlertService } from '../../../core/services/alertService/alert.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-esquecisenha',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, AlertComponent],
  templateUrl: './esquecisenha.component.html',
  styleUrls: ['./esquecisenha.component.css']
})
export class EsquecisenhaComponent {
  email = '';
  siteKey = '';
  mensagemErro = '';
  mensagemSucesso = '';
  carregando = false;

  constructor(
    private router: Router,
    private apiEsqueciSenha: ApiEsqueciSenhaService,
    private globalService: GlobalService,
    private alertService: AlertService
  ) {
    this.siteKey = this.globalService.siteKey;
  }

    ngOnInit() {this.loadRecaptcha()}
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
  enviarEmail() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.carregando = true;

    if (!this.email) {
      this.mensagemErro = 'Por favor, preencha o email.';
      this.carregando = false;
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha.execute(this.siteKey, { action: 'esquecisenha' }).then((token: string) => {
        this.apiEsqueciSenha.esqueciSenha(this.email, token).subscribe({
          next: (res) => {
            this.alertService.exibir('success', 'Email enviado com sucesso! Verifique sua caixa de entrada.');
            this.carregando = false;
          },
          error: (err) => {
            this.mensagemErro = err.error?.conteudoJson?.message || 'Erro ao enviar email de redefinição.';
            this.carregando = false;
            console.error(err);
          }
        });
      });
    });
  }
}

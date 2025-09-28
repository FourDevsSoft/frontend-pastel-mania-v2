import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiRedefinirSenhaService } from '../../../core/services/ApiRedefinirSenha/ApiRedefinirSenha.service';
import { GlobalService } from '../../../core/services/global.service';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { AlertService } from '../../../core/services/alertService/alert.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-redefinirsenha',
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent]
})
export class RedefinirsenhaComponent implements OnInit {
  senha1: string = '';
  senha2: string = '';
  showSenha1: boolean = false;
  showSenha2: boolean = false;

  token: string | null = null;
  timestamp: string | null = null;

  tempoRestante: string = '';
  tempoEsgotado: boolean = false;
  intervaloId: any;
  siteKey: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private redefinirSenhaService: ApiRedefinirSenhaService,
    private globalService: GlobalService,
    private alertService: AlertService
  ) {
    this.siteKey = this.globalService.siteKey;
  }

  ngOnInit() {
    this.loadRecaptcha()
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.timestamp = params['timestamp'];

      if (!this.token || !this.timestamp) {
        this.alertService.exibir('error', 'Link inválido ou expirado.');
        this.tempoEsgotado = true;
      } else {
        this.iniciarTemporizador(this.timestamp);
      }
    });
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

  toggleShowSenha(input: number) {
    if (input === 1) this.showSenha1 = !this.showSenha1;
    else this.showSenha2 = !this.showSenha2;
  }

  senhasIguais(): boolean {
    return this.senha1.length > 0 && this.senha1 === this.senha2;
  }

  iniciarTemporizador(timestampStr: string) {
    const tempoInicial = new Date(timestampStr).getTime();
    const tresHoras = 3 * 60 * 60 * 1000;
    const tempoInicialAjustado = tempoInicial + tresHoras;
    const tempoLimite = 5 * 60 * 1000;

    this.intervaloId = setInterval(() => {
      const tempoAtual = new Date().getTime();
      const diff = tempoInicialAjustado + tempoLimite - tempoAtual;

      if (diff <= 0) {
        this.tempoRestante = 'Tempo esgotado!';
        this.tempoEsgotado = true;
        clearInterval(this.intervaloId);
      } else {
        const segundos = Math.ceil(diff / 1000);
        const minutos = Math.floor(segundos / 60);
        const restanteSegundos = segundos % 60;
        this.tempoRestante = `Tempo restante: ${minutos}m ${restanteSegundos}s`;
      }
    }, 1000);
  }

  redefinirSenha() {
    if (!this.senhasIguais()) {
      this.alertService.exibir('error', 'As senhas não coincidem.');
      return;
    }

    if (this.senha1.length < 8) {
      this.alertService.exibir('error', 'A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (!this.token) {
      this.alertService.exibir('error', 'Token inválido.');
      return;
    }

    if (this.tempoEsgotado) {
      this.alertService.exibir('error', 'Tempo esgotado para redefinir a senha.');
      return;
    }

    if (typeof grecaptcha === 'undefined') {
      this.alertService.exibir('error', 'reCAPTCHA não carregado.');
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha.execute(this.siteKey, { action: 'redefinirsenha' }).then((recaptchaToken: string) => {
        if (!recaptchaToken) {
          this.alertService.exibir('error', 'Erro ao validar o reCAPTCHA.');
          return;
        }

        const payload = {
          new_password: this.senha1,
          recaptchaToken: recaptchaToken
        };

        this.redefinirSenhaService.redefinirSenha(payload, this.token!).subscribe({
          next: () => {
            this.alertService.exibir('success', 'Senha redefinida com sucesso!');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            console.error(err);
            this.alertService.exibir('error', 'Erro ao redefinir a senha. Tente novamente.');
          }
        });
      }).catch((err: any) => {
        console.error(err);
        this.alertService.exibir('error', 'Erro ao executar o reCAPTCHA.');
      });
    });
  }
}

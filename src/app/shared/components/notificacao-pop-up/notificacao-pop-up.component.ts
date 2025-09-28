import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiNotificacaoService } from '../../../core/services/ApiNotificacao/ApiNotificacao.service';
import { AlertService } from '../../../core/services/alertService/alert.service';
import { Notificacao } from '../../../shared/models/notificacao.model';
import { AlertComponent } from '../globais/alert/alert.component';

@Component({
  selector: 'app-notificacao-pop-up',
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './notificacao-pop-up.component.html',
  styleUrl: './notificacao-pop-up.component.css'
})
export class NotificacaoPopUpComponent {

  visiblePopUpNotificacao = false
  notificacoes: Notificacao[] = []


  constructor(
    private notificacaoService: ApiNotificacaoService,
    private alertService: AlertService
  ) { }

  fecharPopUpNotificacao() {
    this.visiblePopUpNotificacao = false
  }


  abrirPopUpNotificacao() {
   

    localStorage.setItem('notificacaoStatus', "false");
    

    this.notificacaoService.listarNotificacoes().subscribe({
      next: (response) => {
        this.notificacoes = response.conteudoJson;
        this.notificacoes.length === 0 && this.alertService.exibir( "error","Nenhum Notificação no momento! 😔",5000)
        //this.notificacoes.length !== 0 && this.visiblePopUpNotificacao = true
        this.visiblePopUpNotificacao = this.notificacoes.length !== 0;
      },
      error: () => {
        //this.visiblePopUpAluno = false;
        this.alertService.exibir('error', 'Erro ao carregar dados do aluno', 3000);
      }
    });
  }

}


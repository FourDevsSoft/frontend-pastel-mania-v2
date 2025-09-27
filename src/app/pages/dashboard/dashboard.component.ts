import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';

import { ApiDashboardService } from '../../core/services/ApiDashboard/ApiDashboard.service';
import { AlertService } from '../../core/services/alertService/alert.service';
import { AlertComponent } from '../../shared/components/alert/alert.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SideBarComponent, BannerComponent, AlertComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  mediaSolicitacoesGeral: number = 0;
  totalProfessor: number = 0;
  totalCoordenador: number = 0;
  totalAlunos: number = 0;
  totalTurmas: number = 0;
  totalSalas: number = 0;
  totalResponsaveis: number = 0

  cardsLinha1: any[] = [];
  cardsLinha2: any[] = [];

  constructor(
    private dashboardService: ApiDashboardService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.buscarDadosCardsDashboard();
  }

  buscarDadosCardsDashboard() {

        this.mediaSolicitacoesGeral =0;
        this.totalProfessor = 0;
        this.totalCoordenador = 0;
        this.totalAlunos = 0
        this.totalTurmas = 0;
        this.totalSalas = 0;
        this.totalResponsaveis = 0;

        // Atualiza os cards após carregar os dados
        this.cardsLinha1 = [
          {
            titulo: 'Clientes',
            valor: this.mediaSolicitacoesGeral,
           /* sufixo: 'min/s',*/
            classe: 'azul',
            destaque: true
          },
          {
            titulo: 'Média diária de entregas',
            valor: this.totalProfessor,
            classe: 'vermelho'
          },
          {
            titulo: 'Funcionários(as):',
            valor: this.totalCoordenador,
            classe: 'cinza'
          },
          {
            titulo: 'Motoboy',
            valor: this.totalAlunos,
            classe: 'verde',
            negrito: true
          }
        ];

        this.cardsLinha2 = [
          {
            titulo: 'Itens no cardápio',
            valor: this.totalTurmas,
            classe: 'laranja'
          },
          {
            titulo: 'Dado6',
            valor: this.totalSalas,
            classe: 'roxo'
          },
           {
            titulo: 'Dado7',
            valor: this.totalResponsaveis,
            classe: 'amarelo'
          }
        ];
  }
}

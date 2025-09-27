import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  imports: [CommonModule],
})
export class BannerComponent implements OnInit {
  nomeDaPagina: string = '';
  iconeDaPagina: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const rawPath = this.router.url.replace('/', '');

    const nomesAmigaveis: { [key: string]: string } = {
      dashboard: 'Dashboard',
     /* usuario: 'Usuário',*/
      cardapio: 'Cardápio',
      portoes: 'Portões',
      alunos: 'Alunos',
      responsaveis: 'Responsáveis',
      salas: 'Salas',
      turmas: 'Turmas',
      transfturmas: 'Transf.Turmas',
      historico: 'Histórico',
      auxiliar: 'Auxiliar',
      professor: 'Professor',
      coordenacao: 'Coordenação',
    };

    const icones: { [key: string]: string } = {
      dashboard: 'bi bi-grid-fill',
      /*usuario: 'bi bi-person-fill',*/
      cardapio:  'bi bi-list-task',
      portoes: 'bi bi-door-open-fill',
      alunos: 'bi bi-people',
      responsaveis: 'bi bi-mortarboard-fill',
      salas: 'bi bi-pencil-square',
      turmas: 'bi bi-mortarboard-fill',
      transfturmas: 'bi bi-arrow-left-right',
      historico: 'bi-clock-history',
      auxiliar: 'bi-person-badge-fill',
      professor: 'bi-journal-text',
      coordenacao: 'bi-briefcase-fill',
    };

    this.nomeDaPagina =
      nomesAmigaveis[rawPath] ||
      rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

    this.iconeDaPagina = icones[rawPath] || 'bi-info-circle-fill';
  }
}

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
    // Obtém a URL completa sem parâmetros
    const rawPath = this.router.url.split('?')[0].replace(/^\/+/, '');

    // Mapeia nomes amigáveis para as rotas declaradas
    const nomesAmigaveis: { [key: string]: string } = {
      'adm/dashboard': 'Dashboard',
      'adm/usuarios': 'Usuários',
      'adm/cardapio': 'Cardápio',
      'adm/categorias-cardapio': 'Categorias de Cardápio',
      'adm/analise': 'Análises',
      'adm/pedidos': 'Pedidos',
      'adm/funcionamento': 'Funcionamento',
      'adm/regioes-entrega': 'Regiões de Entrega',
      'adm/mensagens': 'Mensagens',
      'adm/motoboy': 'Motoboys',

    };

    // Ícones correspondentes a cada rota
    const icones: { [key: string]: string } = {
      'adm/dashboard': 'bi bi-grid-fill',
      'adm/usuarios': 'bi bi-person-fill',
      'adm/cardapio': 'bi bi-journal-text',
      'adm/categorias-cardapio': 'bi bi-list-check',
      'adm/analise': 'bi bi-graph-up',
      'adm/pedidos': 'bi bi-bag-check-fill',
      'adm/funcionamento': 'bi bi-clock-fill',
      'adm/regioes-entrega': 'bi bi-geo-alt-fill',
      'adm/mensagens': 'bi bi-chat-dots-fill',
      'adm/motoboy': 'bi bi-bicycle',

    };

    // Se a rota tiver parâmetros (ex: erro/404), pega só a base
    const basePath = rawPath.split('/').slice(0, 2).join('/');

    this.nomeDaPagina =
      nomesAmigaveis[rawPath] ||
      nomesAmigaveis[basePath] ||
      rawPath.charAt(0).toUpperCase() + rawPath.slice(1);

    this.iconeDaPagina =
      icones[rawPath] || icones[basePath] || 'bi bi-info-circle-fill';
  }
}

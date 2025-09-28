import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/interceptors/auth/auth.service';
import { functionUser } from '../../../../utils/functionUser';
import { NotificacaoPopUpComponent } from '../../notificacao-pop-up/notificacao-pop-up.component';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../core/services/websocket/websoket.service'
import { GlobalService } from '../../../../core/services/global.service';
import { AlertService } from '../../../../core/services/alertService/alert.service';
import { AlertComponent } from '../../globais/alert/alert.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NotificacaoPopUpComponent, AlertComponent]
})
export class SideBarComponent implements OnInit {
  private subscription?: Subscription;

  situacaoMenu: string = 'aberto';
  situacaoMenuMobile: string = 'fechado';
  nomeUsuario: string = '';
  funcaoUsuario: number = 0;
  notificacaoStatus: string = localStorage.getItem('notificacaoStatus') ?? ''

  @ViewChild('popupNotificacao') popupBotificacaoComponent!: NotificacaoPopUpComponent;

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService, private websocketService: WebsocketService,
    private globalService: GlobalService) { }

  async ngOnInit(): Promise<void> {

    //monitora via websocket nova Notificação 
    this.websocketService.connect(this.globalService.apiUrl);
    this.subscription = this.websocketService.listen('novaNotificacao').subscribe(data => {
    
      if(localStorage.getItem( 'funcaoUsuario') !== 'professor'){
          this.alertService.exibir('success', 'Nova Notificação!');
      this.tocarSomNotificacao()
    }
      localStorage.setItem('notificacaoStatus', "true");
      this.removerPontoVermelho();
    });

    const estadoSalvo = localStorage.getItem('estadoMenu');
    if (estadoSalvo) {
      this.situacaoMenu = estadoSalvo;
      this.aplicarEstadoMenu();
    }

    const nome = localStorage.getItem('nomeUsuario');
    this.nomeUsuario = nome ? nome : 'Usuário';

    const funcaoUsuario = await functionUser();
    //this.funcaoUsuario = funcaoUsuario ? funcaoUsuario : 0;
  }

    tocarSomNotificacao() {
    const audio = new Audio('novaNotificacao.mp3');
    audio.play().catch(e => {
      console.error('Erro ao tocar som:', e);
    });
  }

  removerPontoVermelho() {
    this.notificacaoStatus = localStorage.getItem('notificacaoStatus') ?? ''
  }

  toggleMenu(): void {
    if (window.innerWidth > 800) {
      this.situacaoMenu === 'aberto' ? this.fecharMenuPC() : this.abrirMenuPC();
    } else {
      this.situacaoMenuMobile === 'fechado' ? this.abrirMenuMobile() : this.fecharMenuMobile();
    }
  }

  verNotificacoes() {
    this.popupBotificacaoComponent.abrirPopUpNotificacao()
    this.removerPontoVermelho();
  }

  logout(): void {
    this.authService.logout();
  }

  fecharMenuPC(): void {
    const nav = document.getElementById('nav');
    const textMenus = document.querySelectorAll('.text-menu');
    const itensMenus = document.querySelectorAll('.itens-menu');
    const containMain = document.getElementById('coteudo-geral');
    const notificacao = document.getElementById('notificacao');

    if (nav) nav.style.left = '-130px';

    textMenus.forEach(menu => (menu as HTMLElement).style.display = 'none');
    itensMenus.forEach(item => {
      (item as HTMLElement).style.justifyContent = 'end';
      //(item as HTMLElement).style.marginRight = '1vh';
    });

    if (containMain) containMain.style.marginLeft = '5.5%';
    if (notificacao) notificacao.style.display = 'none';

    this.situacaoMenu = 'fechado';
    localStorage.setItem('estadoMenu', 'fechado');
  }

  abrirMenuPC(): void {
    const nav = document.getElementById('nav');
    const textMenus = document.querySelectorAll('.text-menu');
    const itensMenus = document.querySelectorAll('.itens-menu');
    const containMain = document.getElementById('coteudo-geral');
    const notificacao = document.getElementById('notificacao');

    if (nav) nav.style.left = '0';

    textMenus.forEach(menu => (menu as HTMLElement).style.display = 'block');
    itensMenus.forEach(item => {
      (item as HTMLElement).style.justifyContent = 'start';
      (item as HTMLElement).style.marginRight = '0';
    });

    if (containMain) containMain.style.marginLeft = '195px';
    if (notificacao) notificacao.style.display = 'contents';

    this.situacaoMenu = 'aberto';
    localStorage.setItem('estadoMenu', 'aberto');
  }

  abrirMenuMobile(): void {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.style.height = '98%';
      nav.style.overflow = 'overlay';
    }
    this.situacaoMenuMobile = 'aberto';
  }

  fecharMenuMobile(): void {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.style.height = '65px';
      nav.style.overflow = 'hidden';
    }
    this.situacaoMenuMobile = 'fechado';
  }

  aplicarEstadoMenu(): void {
    if (this.situacaoMenu === 'fechado') {
      setTimeout(() => {
        this.fecharMenuPC();
      }, 500);
    } else {
      this.abrirMenuPC();
    }
  }
}

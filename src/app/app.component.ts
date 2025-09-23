import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from '../app/shared/components/preloader/preloader.component';
import { ApiNotificacaoService } from './core/services/ApiNotificacao/ApiNotificacao.service';
import { WebsocketService } from './core/services/websocket/websoket.service'
import { GlobalService } from './core/services/global.service';
import { Subscription } from 'rxjs';
import { Notificacao } from './shared/models/notificacao.model';
import { AlertService } from './core/services/alertService/alert.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { environment } from '../../src/environments/environment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent, AlertComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-frontend';

  //ambiente dev ou prod
  showDevBanner = !environment.production;

  private subscription?: Subscription;

  constructor(
    private alertService: AlertService,
    private notificacaoService: ApiNotificacaoService,
    private websocketService: WebsocketService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit() {

  }
}

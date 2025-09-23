import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AlertService } from '../../core/services/alertService/alert.service';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SideBarComponent,
    AlertComponent
  ],
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})

export class NotificacaoComponent {

}


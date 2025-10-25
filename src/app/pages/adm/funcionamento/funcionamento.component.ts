import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { AlertService } from '../../../core/services/alertService/alert.service';
import { FuncionamentoService } from '../../../core/services/funcionamento/Funcionamento.Service';
import { HorarioFuncionamento } from '../../../shared/models/funcionamento.model';
import { AplicarHorariosComponent } from '../../../shared/components/aplicar-horarios/aplicar-horarios.component';

@Component({
  selector: 'app-funcionamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AplicarHorariosComponent,
    SideBarComponent,
    BannerComponent,
    AlertComponent
  ],
  templateUrl: './funcionamento.component.html',
  styleUrls: ['./funcionamento.component.css']
})
export class FuncionamentoComponent implements OnInit {

  diasSemana = [
    { nome: 'Segunda', id: 2, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Terça', id: 3, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Quarta', id: 4, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Quinta', id: 5, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Sexta', id: 6, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Sábado', id: 7, inicio: '', fim: '', ativo: true, selecionado: false },
    { nome: 'Domingo', id: 1, inicio: '', fim: '', ativo: true, selecionado: false },
  ];

  modalAberto = false;

  constructor(
    private alertService: AlertService,
    private funcionamentoService: FuncionamentoService
  ) {}

  ngOnInit(): void {
    this.carregarHorarios();
  }

  abrirAplicarHorarios() {
    this.modalAberto = true;
  }

  fecharAplicarHorarios() {
    this.modalAberto = false;
  }

  carregarHorarios(): void {
    this.funcionamentoService.getAll().subscribe({
      next: (data: HorarioFuncionamento[]) => {
        data.forEach((h: HorarioFuncionamento) => {
          const dia = this.diasSemana.find(d => d.id === h.dia_semana_id);
          if (dia) {
            dia.inicio = h.hora_abertura?.substring(0, 5) || '';
            dia.fim = h.hora_fechamento?.substring(0, 5) || '';
          }
        });
      },
      error: () => this.alertService.exibir('error', 'Erro ao carregar horários.')
    });
  }

  salvarHorarios(): void {
    const horariosAtualizados: HorarioFuncionamento[] = this.diasSemana.map(d => ({
      dia_semana_id: d.id,
      hora_abertura: `${d.inicio}:00`,
      hora_fechamento: `${d.fim}:00`,
      ativo: d.ativo
    }));

    this.funcionamentoService.createLote(horariosAtualizados).subscribe({
      next: () => this.alertService.exibir('success', 'Horários salvos com sucesso!'),
      error: () => this.alertService.exibir('error', 'Erro ao salvar horários.')
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../core/services/alertService/alert.service';

@Component({
  selector: 'app-aplicar-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aplicar-horarios.component.html',
  styleUrls: ['./aplicar-horarios.component.css']
})
export class AplicarHorariosComponent {
  @Input() diasSemana: any[] = [];
  @Input() visivel = false;
  @Output() fechar = new EventEmitter<void>();

  horarioPadraoInicio = '08:00';
  horarioPadraoFim = '22:00';

  constructor(private alertService: AlertService) {}

  aplicarHorariosPadrao(): void {
    const selecionados = this.diasSemana.filter(d => d.selecionado);
    if (selecionados.length === 0) {
      this.alertService.exibir('error', 'Selecione ao menos um dia!');
      return;
    }

    selecionados.forEach(dia => {
      dia.inicio = this.horarioPadraoInicio;
      dia.fim = this.horarioPadraoFim;
    });

    this.alertService.exibir('success', 'Horários aplicados com sucesso!');
  }

  selecionarTodos(): void {
    this.diasSemana.forEach(d => d.selecionado = true);
  }

  limparSelecao(): void {
    this.diasSemana.forEach(d => d.selecionado = false);
  }

  fecharModal(): void {
    this.fechar.emit();
  }
}

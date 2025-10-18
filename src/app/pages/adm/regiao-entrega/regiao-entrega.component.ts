import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
import { ConfirmPopUpComponent } from '../../../shared/components/globais/confirm-pop-up/confirm-pop-up.component';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { AlertService } from '../../../core/services/alertService/alert.service';
import { RegiaoService } from '../../../core/services/RegiaoService/Regiao.Service';
import { RegiaoEntrega } from '../../../shared/models/regiao.model';

@Component({
  selector: 'app-regiao-entrega',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SideBarComponent,
    BannerComponent,
    ConfirmPopUpComponent,
    AlertComponent
  ],
  templateUrl: './regiao-entrega.component.html',
  styleUrls: ['./regiao-entrega.component.css']
})
export class RegiaoEntregaComponent implements OnInit {
  regioes: RegiaoEntrega[] = [];
  formularioVisivel = false;
  editando = false;
  idEditando: number | null = null;
  erro = '';

  termoBusca = '';
  nome = '';
  preco: number | null = null;

  confirmPopupVisible = false;
  idParaExcluir: number | null = null;

  constructor(private alertService: AlertService, private regiaoService: RegiaoService) {}

  ngOnInit(): void {
    this.carregarRegioes();
  }

  get regioesFiltradas(): RegiaoEntrega[] {
    if (!this.termoBusca) return this.regioes;
    const busca = this.termoBusca.toLowerCase();
    return this.regioes.filter(reg => reg.nome.toLowerCase().includes(busca));
  }

  mostrarFormularioParaCriar(): void {
    this.limparFormulario();
    this.formularioVisivel = true;
    this.editando = false;
    this.idEditando = null;
  }

  preencherFormularioParaEdicao(reg: RegiaoEntrega): void {
    if (!reg.id_regiao) return;

    this.formularioVisivel = true;
    this.editando = true;
    this.idEditando = reg.id_regiao;

    this.nome = reg.nome;
    this.preco = reg.preco;
  }

  salvar(): void {
    if (!this.nome || this.nome.trim() === '' || this.preco === null || isNaN(this.preco) || this.preco < 0) {
      this.erro = 'Preencha todos os campos corretamente';
      return;
    }

    this.erro = '';

    const regiao: RegiaoEntrega = {
      nome: this.nome.trim(),
      preco: this.preco
    };

    if (this.editando && this.idEditando !== null) {
      this.regiaoService.update(this.idEditando, regiao).subscribe({
        next: () => {
          this.alertService.exibir('success', 'Região atualizada com sucesso!');
          this.carregarRegioes();
          this.limparFormulario();
        },
        error: (err) => {
          const mensagem = err?.errorMessages?.join(', ') || 'Erro ao atualizar região.';
          this.alertService.exibir('error', mensagem);
        }
      });
    } else {
      this.regiaoService.create(regiao).subscribe({
        next: () => {
          this.alertService.exibir('success', 'Região criada com sucesso!');
          this.carregarRegioes();
          this.limparFormulario();
        },
        error: (err) => {
          const mensagem = err?.errorMessages?.join(', ') || 'Erro ao criar região.';
          this.alertService.exibir('error', mensagem);
        }
      });
    }
  }

  carregarRegioes(): void {
    this.regiaoService.getAll(this.termoBusca).subscribe({
      next: data => (this.regioes = data),
      error: (err) => {
        const mensagem = err?.errorMessages?.join(', ') || 'Erro ao carregar regiões.';
        this.alertService.exibir('error', mensagem);
      }
    });
  }

  onTermoBuscaChange(): void {
    this.carregarRegioes();
  }

  toogleDeletar(id: number): void {
    this.idParaExcluir = id;
    this.confirmPopupVisible = true;
  }

  deletarRegiao(id: number): void {
    this.regiaoService.delete(id).subscribe({
      next: () => {
        this.alertService.exibir('success', 'Região excluída com sucesso!');
        this.carregarRegioes();
        this.confirmPopupVisible = false;
      },
      error: (err) => {
        const mensagem = err?.errorMessages?.join(', ') || 'Erro ao excluir região.';
        this.alertService.exibir('error', mensagem);
      }
    });
  }

  limparFormulario(): void {
    this.nome = '';
    this.preco = null;
    this.editando = false;
    this.idEditando = null;
    this.formularioVisivel = false;
    this.erro = '';
  }
}

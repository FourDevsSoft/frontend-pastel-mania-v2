import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
import { ConfirmPopUpComponent } from '../../../shared/components/globais/confirm-pop-up/confirm-pop-up.component';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { Categoria } from '../../../shared/models/categoria.model';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoriaService } from '../../../core/services/categoria/categoria.service';
import { AlertService } from '../../../core/services/alertService/alert.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categorias-cardapio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SideBarComponent,
    BannerComponent,
    ConfirmPopUpComponent,
    AlertComponent,
    DragDropModule
  ],
  templateUrl: './categorias-cardapio.component.html',
  styleUrls: ['./categorias-cardapio.component.css']
})
export class CategoriasCardapioComponent implements OnInit {

  categorias: Categoria[] = [];
  formularioVisivel = false;
  editando = false;
  idEditando: number | null = null;
  erro = '';

  termoBusca = '';
  nome = '';
  descricao = '';

  confirmPopupVisible = false;
  idParaExcluir: number | null = null;

  editMode = false;
  dragging: Set<number> = new Set<number>();

  constructor(
    private categoriaService: CategoriaService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCategorias(); // Carrega todas as categorias ao inicializar o componente
  }

  get categoriasFiltradas(): Categoria[] {
    if (!this.termoBusca) return this.categorias;
    const busca = this.termoBusca.toLowerCase();
    return this.categorias.filter(cat => cat.nome.toLowerCase().includes(busca));
  }

  mostrarFormularioParaCriar(): void {
    this.limparFormulario();
    this.formularioVisivel = true;
    this.editando = false;
    this.idEditando = null;
  }

  preencherFormularioParaEdicao(categoria: Categoria): void {
    const id = categoria.id ?? categoria.id_categoria;
    if (!id) return;

    // Mostrar formulário
    this.formularioVisivel = true;
    this.editando = true;
    this.idEditando = id;

    // Preencher campos do formulário
    this.nome = categoria.nome ?? '';
    this.descricao = categoria.descricao ?? '';
  }

  salvar(): void {
    if (!this.nome.trim() || !this.descricao.trim()) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }
    this.erro = '';

    const categoriaData: Categoria = {
      nome: this.nome.trim(),
      descricao: this.descricao.trim()
    };

    if (this.editando && this.idEditando !== null) {
      this.categoriaService.update(this.idEditando, categoriaData).subscribe({
        next: updated => {
          // Recarregar as categorias após a atualização
          this.carregarCategorias();
          this.limparFormulario();
          this.alertService.exibir('success', 'Categoria atualizada com sucesso!');
        },
        error: err => {
          const mensagem = err?.errorMessages?.join(', ') || 'Erro ao atualizar categoria';
          this.alertService.exibir('error', mensagem);
        }
      });
    } else {
      this.categoriaService.create(categoriaData).subscribe({
        next: created => {
          // Recarregar as categorias após a criação
          this.carregarCategorias();
          this.limparFormulario();
          this.alertService.exibir('success', 'Categoria criada com sucesso!');
        },
        error: err => {
          const mensagem = err?.errorMessages?.join(', ') || 'Erro ao criar categoria';
          this.alertService.exibir('error', mensagem);
        }
      });
    }
  }

  carregarCategorias(): void {
    this.categoriaService.getAll(this.termoBusca).subscribe({
      next: data => {
        // Atualizar categorias sem excluir as existentes
        this.categorias = data.map(c => ({ ...c, id: c.id ?? c.id_categoria }));
        this.cdr.detectChanges(); // Forçar atualização da UI
      },
      error: err => {
        const mensagem = err?.errorMessages?.join(', ') || 'Erro ao carregar categorias';
        this.alertService.exibir('error', mensagem);
      }
    });
  }

  toogleDeletar(id?: number): void {
    if (!id) return;
    this.idParaExcluir = id;
    this.confirmPopupVisible = true;
  }

  deletarCategoria(id?: number): void {
    if (!id) return;
    this.categoriaService.delete(id).subscribe({
      next: () => {
        // Atualiza a lista após a exclusão de uma categoria
        this.categorias = this.categorias.filter(c => (c.id ?? c.id_categoria) !== id);
        this.confirmPopupVisible = false;
        this.alertService.exibir('success', 'Categoria excluída com sucesso!');
      },
      error: err => {
        const mensagem = err?.errorMessages?.join(', ') || 'Erro ao excluir categoria';
        this.alertService.exibir('error', mensagem);
      }
    });
  }

  drop(event: CdkDragDrop<Categoria[]>): void {
    // Atualiza a ordem das categorias localmente
    moveItemInArray(this.categorias, event.previousIndex, event.currentIndex);

    // Ajuste as ordens para começar de 1
    const categoriasOrdem = {
        categorias: this.categorias.map((categoria, index) => ({
            id_categoria: categoria.id ?? categoria.id_categoria!,
            ordem: index + 1 // Começa de 1 ao invés de 0
        }))
    };

    // Envia a requisição com o formato correto
    this.categoriaService.updateOrdem(categoriasOrdem).subscribe({
        next: () => {
            this.alertService.exibir('success', 'Ordem das categorias atualizada!');
        },
        error: err => {
            const mensagem = err?.errorMessages?.join(', ') || 'Erro ao atualizar ordem';
            this.alertService.exibir('error', mensagem);
        }
    });
}


  onDragStart(event: any, cat: Categoria) {
    this.dragging.add(cat.id ?? cat.id_categoria!);
  }

  onDragEnd(event: any, cat: Categoria) {
    this.dragging.delete(cat.id ?? cat.id_categoria!);
  }

  toggleEditar(): void {
    this.editMode = !this.editMode;
  }

  trackById(index: number, cat: Categoria): number | undefined {
    return cat.id ?? cat.id_categoria;
  }

  getCursor(cat: Categoria): string {
    if (!this.editMode) return 'default';
    if (this.dragging.has(cat.id ?? cat.id_categoria!)) return 'grabbing';
    return 'grab';
  }

  limparFormulario(): void {
    this.nome = '';
    this.descricao = '';
    this.editando = false;
    this.idEditando = null;
    this.formularioVisivel = false;
    this.erro = '';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../../../shared/components/adm/side-bar/side-bar.component';
import { BannerComponent } from '../../../shared/components/adm/banner/banner.component';
import { ConfirmPopUpComponent } from '../../../shared/components/globais/confirm-pop-up/confirm-pop-up.component';
import { AlertComponent } from '../../../shared/components/globais/alert/alert.component';
import { Categoria } from '../../../shared/models/categoria.model';

import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  // Para controlar quais cards estão sendo arrastados
  dragging: Set<number> = new Set<number>();

  constructor() {}

  ngOnInit(): void {
    this.carregarCategorias();
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
    if (!categoria.id) return;
    this.formularioVisivel = true;
    this.editando = true;
    this.idEditando = categoria.id;
    this.nome = categoria.nome;
    this.descricao = categoria.descricao;
  }

  salvar(): void {
    if (!this.nome.trim() || !this.descricao.trim()) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    this.erro = '';

    if (this.editando && this.idEditando !== null) {
      const index = this.categorias.findIndex(c => c.id === this.idEditando);
      if (index > -1) {
        this.categorias[index].nome = this.nome.trim();
        this.categorias[index].descricao = this.descricao.trim();
        this.categorias[index].dataAtualizacao = new Date().toISOString();
      }
    } else {
      const novaCategoria: Categoria = {
        id: this.categorias.length ? Math.max(...this.categorias.map(c => c.id!)) + 1 : 1,
        nome: this.nome.trim(),
        descricao: this.descricao.trim(),
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      this.categorias.unshift(novaCategoria);
    }

    this.limparFormulario();
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }

  toggleEditar(): void {
    this.editMode = !this.editMode;
  }

  carregarCategorias(): void {
    this.categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
  }

  toogleDeletar(id: number): void {
    this.idParaExcluir = id;
    this.confirmPopupVisible = true;
  }

  deletarCategoria(id: number): void {
    this.categorias = this.categorias.filter(c => c.id !== id);
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
    this.confirmPopupVisible = false;
  }

  limparFormulario(): void {
    this.nome = '';
    this.descricao = '';
    this.editando = false;
    this.idEditando = null;
    this.formularioVisivel = false;
    this.erro = '';
  }

  drop(event: CdkDragDrop<Categoria[]>) {
    moveItemInArray(this.categorias, event.previousIndex, event.currentIndex);
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }

  /* ===================== CURSOR ===================== */
  onDragStart(event: any, cat: Categoria) {
    this.dragging.add(cat.id!);
  }

  onDragEnd(event: any, cat: Categoria) {
    this.dragging.delete(cat.id!);
  }

  getCursor(cat: Categoria): string {
    if (!this.editMode) return 'default';          // fora do modo edição
    if (this.dragging.has(cat.id!)) return 'grabbing'; // segurando o card
    return 'grab';                                 // editMode ativo, card parado
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { ConfirmPopUpComponent } from '../../shared/components/confirm-pop-up/confirm-pop-up.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AlertService } from '../../core/services/alertService/alert.service';

export interface ItemCardapio {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem?: string;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    BannerComponent,
    FormsModule,
    ConfirmPopUpComponent,
    AlertComponent
  ],
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
// ... imports iguais

export class CardapioComponent implements OnInit {

  itens: ItemCardapio[] = [];
  formularioVisivel: boolean = false;
  editando: boolean = false;
  idEditando: string | null = null;
  erro: string = '';

  // Busca e paginação
  termoBusca: string = '';
  itensPorPagina: number = 10;

  // Campos do formulário
  nome: string = '';
  descricao: string = '';
  preco: number | null = null;
  categoria: string = '';
  imagem: string = '';
  imagemPreview: string | ArrayBuffer | null = null; // 👈 preview da imagem

  // Pop-up de exclusão
  confirmPopupVisible: boolean = false;
  idParaExcluir!: string;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.carregarItens();
  }

  // Atualiza preview quando escolhe imagem
  onImagemSelecionada(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result; // guarda base64
      };
      reader.readAsDataURL(file);
      this.imagem = file.name; // opcional: salvar só nome ou caminho
    }
  }

  // Getter para busca em tempo real
  get itensFiltrados(): ItemCardapio[] {
    if (!this.termoBusca) return this.itens;

    const busca = this.termoBusca.toLowerCase();
    return this.itens.filter(item =>
      item.nome.toLowerCase().includes(busca) ||
      item.descricao.toLowerCase().includes(busca)
    );
  }

  mostrarFormularioParaCriar(): void {
    this.limparFormulario();
    this.formularioVisivel = true;
  }

  preencherFormularioParaEdicao(item: ItemCardapio): void {
    this.formularioVisivel = true;
    this.editando = true;
    this.idEditando = item.id ?? null;

    this.nome = item.nome;
    this.descricao = item.descricao;
    this.preco = item.preco;
    this.categoria = item.categoria;
    this.imagem = item.imagem ?? '';
    this.imagemPreview = item.imagem ?? null;
  }

  salvar(): void {
    if (!this.nome || !this.preco || !this.categoria) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    this.erro = '';

    const item: ItemCardapio = {
      id: this.idEditando ?? undefined,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      categoria: this.categoria,
      imagem: typeof this.imagemPreview === 'string' ? this.imagemPreview : this.imagem
    };

    if (this.editando && this.idEditando) {
      const index = this.itens.findIndex(i => i.id === this.idEditando);
      if (index > -1) this.itens[index] = { ...item, id: this.idEditando };
      this.alertService.exibir('success', 'Item atualizado com sucesso!');
    } else {
      item.id = Date.now().toString();
      this.itens.push(item);
      this.alertService.exibir('success', 'Item criado com sucesso!');
    }

    this.limparFormulario();
  }

  carregarItens(): void {
    this.itens = [
      { id: '1', nome: 'Hambúrguer', descricao: 'Delicioso hambúrguer com queijo', preco: 25.0, categoria: 'Sanduíches', imagem: 'hamburguer.jpg' },
      { id: '2', nome: 'Pizza', descricao: 'Pizza de calabresa grande', preco: 50.0, categoria: 'Pizzas', imagem: 'pizza.jpg' },
      { id: '3', nome: 'Salada', descricao: 'Salada fresca de legumes', preco: 15.0, categoria: 'Saladas', imagem: 'salada.jpg' }
    ];
  }

  toogleDeletar(id: string): void {
    this.idParaExcluir = id;
    this.confirmPopupVisible = true;
  }

  deletarItem(id: string): void {
    this.itens = this.itens.filter(i => i.id !== id);
    this.confirmPopupVisible = false;
    this.alertService.exibir('success', 'Item excluído com sucesso!');
  }

  limparFormulario(): void {
    this.nome = '';
    this.descricao = '';
    this.preco = null;
    this.categoria = '';
    this.imagem = '';
    this.imagemPreview = null;
    this.editando = false;
    this.idEditando = null;
    this.formularioVisivel = false;
    this.erro = '';
  }
}

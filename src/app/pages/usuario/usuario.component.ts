import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../shared/models/usuario.model';
import { UsuarioService } from '../../core/services/ApiUsuario/usuario.service';
import { ConfirmPopUpComponent } from '../../shared/components/confirm-pop-up/confirm-pop-up.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AlertService } from '../../core/services/alertService/alert.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    BannerComponent,
    FormsModule,
    ConfirmPopUpComponent,
    AlertComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  pagination = {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  };
  itensPorPagina = 10;
  erro: string = '';
  usuarios: Usuario[] = [];

  // Campos do formulário
  nome_completo: string = '';
  email: string = '';
  funcao: number | null = null;
  senha: string = '';
  confirmPopupVisibleUsuario: boolean = false;
  idUsuarioParaExcluir!: string;

  termoBusca: string = '';

  // Controle de edição
  editando: boolean = false;
  idEditando: string | null = null;

  formularioVisivel: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  toogleDeletar(id: string) {
    this.idUsuarioParaExcluir = id;
    this.confirmPopupVisibleUsuario = true;
  }

  carregarUsuarios(pagina: number = 1): void {
    this.usuarioService.listar(pagina, this.itensPorPagina).subscribe((res) => {
      this.usuarios = res.data;
      this.usuarios.length === 0 && this.alertService.exibir( "error","Nenhum Registro encontrado! 😔",6000)
      this.pagination = res.pagination;
    });
  }

  mostrarFormularioParaCriar(): void {
    this.limparFormulario();
    this.formularioVisivel = true;
  }

  preencherFormularioParaEdicao(usuario: Usuario): void {
    this.formularioVisivel = true;

    this.nome_completo = usuario.nome_completo;
    this.email = usuario.email;
    this.funcao = usuario.funcao;
    this.senha = '';
    this.editando = true;
    this.idEditando = usuario.id_usuario!;
  }

  salvar(): void {
    if (!this.nome_completo || !this.email || !this.funcao || (!this.editando && !this.senha)) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    this.erro = '';
    const usuario: Usuario = {
      id_usuario: this.idEditando ?? undefined,
      nome_completo: this.nome_completo,
      email: this.email,
      funcao: this.funcao,
    };

    if (this.senha) {
      usuario.senha = this.senha;
    }

    if (this.editando && this.idEditando !== null) {
      const usuarioParaAtualizar = { ...usuario };
      delete usuarioParaAtualizar.id_usuario;

      this.usuarioService.atualizar(this.idEditando, usuarioParaAtualizar).subscribe({
        next: () => {
          this.carregarUsuarios();
          this.limparFormulario();
          this.alertService.exibir('success', 'Usuário atualizado com sucesso!',3000);
        },
        error: (err) => {
          const msg = err.error?.message || 'Erro ao atualizar usuário';
          this.erro = msg;
          this.alertService.exibir('error', msg);
        }
      });
    } else {
      this.usuarioService.criar(usuario).subscribe({
        next: () => {
          this.carregarUsuarios();
          this.limparFormulario();
          this.alertService.exibir('success', 'Usuário criado com sucesso!');
        },
        error: (err) => {
          const msg = err.error?.conteudoJson?.message || 'Erro ao criar usuário';
          this.erro = msg;
          this.alertService.exibir('error', msg);
        }
      });
    }
  }

  deletarUsuario(id: string): void {
    this.usuarioService.deletar(id).subscribe(() => {
      this.carregarUsuarios();
      this.confirmPopupVisibleUsuario = false;
      this.alertService.exibir('success', 'Usuário excluído com sucesso!');
    });
  }

  limparFormulario(): void {
    this.nome_completo = '';
    this.email = '';
    this.funcao = null;
    this.senha = '';
    this.editando = false;
    this.idEditando = null;
    this.formularioVisivel = false;
  }

  buscarUsuarios(): void {
    const termo = this.termoBusca.trim();

    if (termo.length === 0) {
      this.carregarUsuarios();
      return;
    }

    this.usuarioService.buscarPorTermo(termo).subscribe({
      next: (res) => {
        this.usuarios = res.data;
      },
      error: (err) => {
        const msg = err.error?.conteudoJson?.message || 'Erro ao buscar usuários';
        this.alertService.exibir('error', msg);
      }
    });
  }
}

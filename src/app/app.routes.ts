import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; 
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NotificacaoComponent} from './pages/notificacao/notificacao.component';
import { ErroComponent} from './pages/erro/erro.component';
import { EsquecisenhaComponent} from './pages/esquecisenha/esquecisenha.component';
import { RedefinirsenhaComponent} from './pages/redefinirsenha/redefinirsenha.component';
import { CategoriasCardapioComponent} from './pages/categorias-cardapio/categorias-cardapio.component'
import { AnaliseComponent} from './pages/analise/analise.component'
import { PedidosComponent} from './pages/pedidos/pedidos.component'
import {FuncionamentoComponent} from './pages/funcionamento/funcionamento.component'
import { MensagensComponent} from './pages/mensagens/mensagens.component'
import { RegiaoEntregaComponent} from './pages/regiao-entrega/regiao-entrega.component';
import { CardapioComponent} from './pages/cardapio/cardapio.component'


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  
  //DIRETOR ACESSA TUDO
  // Rotas protegidas pelo AuthGuard
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'notificacao', component: NotificacaoComponent, canActivate: [AuthGuard]},
  { path: 'erro/:codigo', component: ErroComponent },
  { path: 'esquecisenha', component: EsquecisenhaComponent},
  { path: 'redefinirsenha', component: RedefinirsenhaComponent},
  { path: 'cardapio', component:CardapioComponent},

  { path: 'categorias-cardapio', component:CategoriasCardapioComponent},
  { path: 'analise', component:AnaliseComponent},
  { path: 'pedidos', component:PedidosComponent},
  { path: 'funcionamento', component:FuncionamentoComponent},
  { path: 'regioes-entrega', component:RegiaoEntregaComponent},
  { path: 'mensagens', component:MensagensComponent},

  // Rota coringa para redirecionar caso o usuário tente acessar uma página inexistente
  { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; 
import { LoginComponent } from './pages/globais/login/login.component';

import { ErroComponent} from './pages/globais/erro/erro.component';
import { EsquecisenhaComponent} from './pages/globais/esquecisenha/esquecisenha.component';
import { RedefinirsenhaComponent} from './pages/globais/redefinirsenha/redefinirsenha.component';

import { UsuarioComponent } from './pages/adm/usuario/usuario.component';
import { DashboardComponent } from './pages/adm/dashboard/dashboard.component';
import { CategoriasCardapioComponent} from './pages/adm/categorias-cardapio/categorias-cardapio.component'
import { AnaliseComponent} from './pages/adm/analise/analise.component'
import { PedidosComponent} from './pages/adm/pedidos/pedidos.component'
import {FuncionamentoComponent} from './pages/adm/funcionamento/funcionamento.component'
import { MensagensComponent} from './pages/adm/mensagens/mensagens.component'
import { RegiaoEntregaComponent} from './pages/adm/regiao-entrega/regiao-entrega.component';
import { CardapioComponent} from './pages/adm/cardapio/cardapio.component';

import { LandingpageComponent} from './pages/cliente-final/landingpage/landingpage.component';
import { CardapioClienteComponent} from './pages/cliente-final/cardapio/cardapio.component';
import { DadosPedidoComponent} from './pages/cliente-final/dados-pedido/dados-pedido.component';

import { MotoboyComponent} from './pages/motoboy/motoboy/motoboy.component';


export const routes: Routes = [
  
  { path: '', redirectTo: 'site', pathMatch: 'full' },

  { path: 'login', component: LoginComponent},
  
  //DIRETOR ACESSA TUDO
  // Rotas protegidas pelo AuthGuard
  { path: 'adm/dashboard', component: DashboardComponent  },
  { path: 'adm/usuarios', component: UsuarioComponent },
  { path: 'adm/cardapio', component:CardapioComponent},
  { path: 'adm/categorias-cardapio', component:CategoriasCardapioComponent},
  { path: 'adm/analise', component:AnaliseComponent},
  { path: 'adm/pedidos', component:PedidosComponent},
  { path: 'adm/funcionamento', component:FuncionamentoComponent},
  { path: 'adm/regioes-entrega', component:RegiaoEntregaComponent},
  { path: 'adm/mensagens', component:MensagensComponent},

  { path: 'erro/:codigo', component: ErroComponent },
  { path: 'esquecisenha', component: EsquecisenhaComponent},
  { path: 'redefinirsenha', component: RedefinirsenhaComponent},

  { path: 'site', component: LandingpageComponent},
  { path: 'cardapio', component: CardapioClienteComponent},
  { path: 'dados-pedido', component: DadosPedidoComponent},

    { path: 'adm/motoboy', component: MotoboyComponent},

  // Rota coringa para redirecionar caso o usuário tente acessar uma página inexistente
  // { path: '**', redirectTo: 'site' }
];

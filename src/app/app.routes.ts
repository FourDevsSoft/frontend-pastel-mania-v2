import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; 
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { NotificacaoComponent} from './pages/notificacao/notificacao.component';
import { ErroComponent} from './pages/erro/erro.component';
import { EsquecisenhaComponent} from './pages/esquecisenha/esquecisenha.component';
import { RedefinirsenhaComponent} from './pages/redefinirsenha/redefinirsenha.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  //DIRETOR ACESSA TUDO
  // Rotas protegidas pelo AuthGuard
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'notificacao', component: NotificacaoComponent, canActivate: [AuthGuard]},
  { path: 'erro/:codigo', component: ErroComponent },
  { path: 'esquecisenha', component: EsquecisenhaComponent},
  { path: 'redefinirsenha', component: RedefinirsenhaComponent},


  // Rota coringa para redirecionar caso o usuário tente acessar uma página inexistente
  { path: '**', redirectTo: 'login' }
];

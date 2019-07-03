import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { IngresoComponent } from './paginas/ingreso/ingreso.component';
import { ErrorComponent } from './paginas/error/error.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { TemplateComponent } from './paginas/template/template.component';
import { ChatComponent } from './paginas/chat/chat.component';
import { MateriasComponent } from './paginas/materias/materias.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'ingreso', component: IngresoComponent },
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'materias', component: MateriasComponent, canActivate: [AuthGuard, IsAdminGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, IsAdminGuard] },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard, IsAdminGuard] },
      { path: '**', component: NotfoundComponent },
      { path: 'error', component: ErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

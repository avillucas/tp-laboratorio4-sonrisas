import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { IngresoComponent } from './paginas/ingreso/ingreso.component';
import { ErrorComponent } from './paginas/error/error.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { TemplateComponent } from './paginas/template/template.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { TurnosComponent } from './paginas/turnos/turnos.component';
import { EspecialistasLaboralesComponent } from './paginas/especialistas-laborales/especialistas-laborales.component';
import { ProfileComponent } from './paginas/profile/profile.component';
import { IsEspecialistaOAdminGuard } from './guards/is-especialista-oadmin.guard';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'ingreso', component: IngresoComponent },
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'turnos/:fecha', component: TurnosComponent, canActivate: [AuthGuard] },
      { path: 'turnos', component: TurnosComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, IsAdminGuard] },
      { path: 'especialistas-horarios', component: EspecialistasLaboralesComponent, canActivate: [AuthGuard, IsAdminGuard] },
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

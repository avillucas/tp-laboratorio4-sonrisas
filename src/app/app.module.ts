
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './servicios/auth.service';
import { LayoutModule } from 'angular-admin-lte';
import { BoxModule } from 'angular-admin-lte';
import { adminLteConf } from '../environments/admin-lte.config';
import { RegistroComponent } from './paginas/registro/registro.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ErrorComponent } from './paginas/error/error.component';
import { IngresoComponent } from './paginas/ingreso/ingreso.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { TemplateComponent } from './paginas/template/template.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProfileComponent } from './paginas/profile/profile.component';
import { UsuariosService } from './servicios/usuarios.service';
import { UsuariosFiltrosComponent } from './paginas/usuarios-filtros/usuarios-filtros.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { UsuariosListaComponent } from './paginas/usuarios-lista/usuarios-lista.component';
import { TipousuarioPipe } from './pipes/tipousuario.pipe';
import { TurnosComponent } from './paginas/turnos/turnos.component';
import { TablaTurnosComponent } from './partes/tablas/turnos/turnos.component';
import { TimestrPipe } from './pipes/timestr.pipe';
import { SelectorEspecialistaComponent } from './partes/filtros/especialista/especialista.component';
import { FechaComponent } from './partes/filtros/fecha/fecha.component';
import { ClienteComponent } from './partes/filtros/cliente/cliente.component';
import { ResenaComponent } from './partes/resena/resena.component';
import { ReservasComponent } from './partes/tablas/reservas/reservas.component';
import { ConsultorioPipe } from './pipes/consultorio.pipe';
import { AtencionesComponent } from './partes/tablas/atenciones/atenciones.component';
import { EncuestaComponent } from './partes/encuesta/encuesta.component';
import { ConsultorioComponent } from './partes/filtros/consultorio/consultorio.component';
import { EspecialistasComponent } from './paginas/especialistas/especialistas.component';
import { AsignacionTurnosComponent } from './partes/asignaciones/turnos/turnos.component';
import { TurnosAccionComponent } from './partes/turnos-accion/turnos-accion.component';
import { ReservasAccionComponent } from './partes/reservas-accion/reservas-accion.component';
import { TurnosEspecialistaComponent } from './paginas/turnos-especialista/turnos-especialista.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    DashboardComponent,
    ErrorComponent,
    IngresoComponent,
    NotfoundComponent,
    TemplateComponent,
    ProfileComponent,
    UsuariosFiltrosComponent,
    UsuariosComponent,
    UsuariosListaComponent,
    TipousuarioPipe,
    TurnosComponent,
    TablaTurnosComponent,
    TimestrPipe,
    SelectorEspecialistaComponent,
    FechaComponent,
    ClienteComponent,
    ReservasComponent,
    ResenaComponent,
    ConsultorioPipe,
    AtencionesComponent,
    EncuestaComponent,
    ConsultorioComponent,
    EspecialistasComponent,
    AsignacionTurnosComponent,
    TurnosAccionComponent,
    ReservasAccionComponent,
    TurnosEspecialistaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule.forRoot(adminLteConf),
    BoxModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, UsuariosService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

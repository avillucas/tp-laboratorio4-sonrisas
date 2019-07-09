import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ITurnoId } from '../../models/turnoid.model';
import { AuthService } from '../../servicios/auth.service';
import { IUsuarioId } from '../../models/usuarioid.model';
import { IUsuario } from '../../models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  private diaConsultado: Date;
  private turnos: Observable<ITurnoId[]>;
  private reservas: Observable<ITurnoId[]>;
  private especialista: IUsuarioId;
  private cliente: IUsuarioId;
  private ocultarSelectorFechas: boolean;
  private ocultarTablaTurnos: boolean;
  private ocultarEncuestas: boolean;


  constructor(
    private tService: TurnosService,
    private uService: UsuariosService,
    private aService: AuthService
  ) {
    this.ocultarSelectorFechas = true;
    this.ocultarTablaTurnos = true;
    this.ocultarEncuestas = true;
    this.aService.user$.subscribe(
      (iusuario: IUsuario) => {
        this.cliente = { id: this.aService.CurrentUID, usuario: UsuariosService.DataDAO(iusuario) } as IUsuarioId;
      });
  }

  public get OcultarSelectorFechas(): boolean {
    return this.ocultarSelectorFechas;
  }

  public get OcultarEncuestas(): boolean {
    return this.ocultarEncuestas;
  }

  public get DiaConsultado(): Date {
    return this.diaConsultado;
  }

  public get EspecialistaUID(): string {
    return this.especialista.id;
  }

  public get Especialista(): IUsuarioId {
    return this.especialista;
  }

  public get CurrentUID(): string {
    return this.aService.CurrentUID;
  }

  public get Turnos(): Observable<ITurnoId[]> {
    return this.turnos;
  }

  public get Reservas(): Observable<ITurnoId[]> {
    return this.reservas;
  }

  public get OcultarTablaTurnos() {
    return this.ocultarTablaTurnos;
  }

  public get OcultarTablaReservas() {
    return typeof this.reservas === 'undefined';
  }

  public ReservarTurno(iturnoid: ITurnoId) {
    iturnoid.turno.clienteUID = this.cliente.id;
    iturnoid.turno.clienteNombre = this.cliente.usuario.Nombre;
    this.tService.Reservar(iturnoid);
  }

  public CancelarTurno(iturnoid: ITurnoId) {
   this.tService.Cancelar(iturnoid);
  }

  public SolicitarEncuesta(iturnoid: ITurnoId) {
    // TODO completar el proceso de encuestas
    this.ocultarEncuestas = false;
    throw new Error('No implementado aun');
  }

  EspecialistaSeleccionado(especialista: IUsuarioId) {
    this.especialista = especialista;
    this.ocultarSelectorFechas = false;
  }

  AplicarFiltros(diaConsultado: Date) {
    this.diaConsultado = diaConsultado;
    this.turnos = this.tService.traerPorDiaEspecialista(this.diaConsultado, this.especialista.id);
    this.ocultarTablaTurnos = false;
  }

  ngOnInit() {
    this.reservas = this.tService.traerReservasPorUsuario(this.CurrentUID);
  }


}

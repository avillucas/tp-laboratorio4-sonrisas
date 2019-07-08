import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ITurnoId } from '../../models/turnoid.model';
import { TurnoDia } from '../../clases/turno-dia';
import { AuthService } from '../../servicios/auth.service';
import { IUsuario } from '../../models/usuario.model';
import { ITurno } from '../../models/turno.model';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  private diaConsultado: Date;
  private turnos: Observable<ITurnoId[]>;
  private especialistaUID: string;
  private ocultarSelectorFechas: boolean;


  constructor(
    private tService: TurnosService,
    private aService: AuthService
  ) {
    this.ocultarSelectorFechas = true;
  }

  public get OcultarSelectorFechas(): boolean {
    return this.ocultarSelectorFechas;
  }

  public get DiaConsultado(): Date {
    return this.diaConsultado;
  }

  public get EspecialistaUID(): string {
    return this.especialistaUID;
  }

  public get Usuario(): Observable<IUsuario> {
    return this.aService.user$;
  }

  public get Turnos(): Observable<ITurnoId[]> {
    return this.turnos;
  }

  public ReservarTurno(iturnoid: ITurnoId) {
    const iturno = { time: iturnoid.turno.time, clienteUID: this.aService.CurrentUID } as ITurno;
    this.tService.Reservar(iturnoid.id, iturno, this.especialistaUID);
  }

  EspecialistaSeleccionado(especialistaUID: string) {
    this.especialistaUID = especialistaUID;
  }

  AplicarFiltros(fecha: string) {
    this.diaConsultado = new Date(fecha + ' 00:00:00');
    this.turnos = this.tService.traerPorDiaEspecialista(this.diaConsultado, this.especialistaUID);
  }

  ngOnInit() {
  }


}

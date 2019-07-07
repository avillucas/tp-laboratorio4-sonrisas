import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ActivatedRoute } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { IUsuarioId } from '../../models/usuarioid.model';
import { environment } from '../../../environments/environment';
import { TurnoDia } from '../../clases/turno-dia';
import { IUsuario } from '../../models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  private diaConsultado: Date;
  private turnos: any;
  private especialista: string;
  private turnosDiaSolicitado: TurnoDia;
  private sub: any;

  constructor(
    private tService: TurnosService,
    private uService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public get Turnos() {
    return this.turnos;
  }

  public get DiaConsultado(): Date {
    return this.diaConsultado;
  }

  public get Especialista(): string {
    return this.especialista;
  }

  public get TurnosDiaSolicitado(): TurnoDia {
    return this.turnosDiaSolicitado;
  }

  private generarTurnoDiaSolicitado() {
    const turnosDelDia = new TurnoDia(this.diaConsultado, this.turnos, this.especialista);
    this.turnosDiaSolicitado = turnosDelDia;
  }

  aplicarFiltros(eventData: any) {
    //
    this.diaConsultado = new Date(eventData.fecha);
    this.especialista = eventData.especialistaUID;
    this.turnos = this.tService.traerPorDiaEspecialista(this.diaConsultado, this.especialista);
    console.info(this.turnos);
    this.generarTurnoDiaSolicitado();
  }

  ngOnInit() {
    // En caso de que  exista la fecha por url para definir
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (typeof params[environment.router.params.fechaTurnos] !== 'undefined') {
        // TODO enviar esto al filtro para que lo muestre
        this.diaConsultado = new Date(params[environment.router.params.fechaTurnos]);
      }
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

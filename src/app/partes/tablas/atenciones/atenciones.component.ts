import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITurnoId } from '../../../models/turnoid.model';
import { TurnosService } from '../../../servicios/turnos.service';

@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.css']
})
// atenciones que debe realizar un medico en la fecha selecionada
export class AtencionesComponent implements OnInit {

  //  turnos filtrados por especialista y dia
  @Input() turnos: Observable<ITurnoId[]>;
  // dia del que se filtro
  @Input() dia: Date;
  //
  @Output() marcarAsistencia = new EventEmitter();
  @Output() marcarFalta = new EventEmitter();

  constructor() {
  }

  get Dia(): Date {
    return this.dia;
  }

  get Turnos(): Observable<ITurnoId[]> {
    return this.turnos;
  }

  MarcarAsistencia(iturnoid: ITurnoId) {
    this.marcarAsistencia.emit(iturnoid);
  }

  MarcarFalta(iturnoid: ITurnoId) {
    this.marcarFalta.emit(iturnoid);
  }

  public AccionDisponibleMostrar(iturnoid: ITurnoId) {
    if (typeof iturnoid.turno.asistio === 'undefined') {
      return 'vigente';
    }
  }

  ngOnInit() {

  }
}

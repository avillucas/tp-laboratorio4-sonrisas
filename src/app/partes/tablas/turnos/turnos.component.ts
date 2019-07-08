import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITurnoId } from '../../../models/turnoid.model';
import { TurnosService } from '../../../servicios/turnos.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  //  turnos filtrados por especialista y dia
  @Input() turnos: Observable<ITurnoId[]>;
  // dia del que se filtro
  @Input() dia: Date;
  // especialista del que se filtro
  @Input() especialistaUID: string;
  // cliente qu esta entrando a realializar una reserva
  @Input() clienteUID: string;
  //
  @Output() reservarTurno = new EventEmitter();
  @Output() cancelarTurno = new EventEmitter();

  constructor() {
  }

  get Dia(): Date {
    return this.dia;
  }

  get Turnos(): Observable<ITurnoId[]> {
    return this.turnos;
  }

  get EspecialistaUID(): string {
    return this.especialistaUID;
  }

  get ClienteUID(): string {
    return this.clienteUID;
  }


  ReservarTurno(iturnoid: ITurnoId) {
    this.reservarTurno.emit(iturnoid);
  }

  CancelarTurno(iturnoid: ITurnoId) {
    this.cancelarTurno.emit(iturnoid);
  }

  public AccionDisponibleMostrar(iturnoid: ITurnoId) {
    if (TurnosService.estaReservado(iturnoid)) {
      // tslint:disable-next-line: triple-equals
      if (iturnoid.turno.asistio === false && iturnoid.turno.clienteUID == this.clienteUID) {
        return 'cancelar';
      }
      return 'reservado';
    } else {
      return 'reservar';
    }
  }

  ngOnInit() {

  }
}

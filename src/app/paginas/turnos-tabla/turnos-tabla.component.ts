import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Time } from '@angular/common';
import { TurnoDia } from 'src/app/clases/turno-dia';
import { Especialista } from 'src/app/clases/especialista';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos-tabla',
  templateUrl: './turnos-tabla.component.html',
  styleUrls: ['./turnos-tabla.component.css']
})
export class TurnosTablaComponent implements OnInit {

  //  private dia: TurnoDia;
  @Input('turnosDiaSolicitado') turnosDiaSolicitado: TurnoDia;
  @Output() reservarTurno = new EventEmitter();
  @Output() cancelarTurno = new EventEmitter();

  constructor() {
  }

  ReservarTurno(especialista: Especialista, time: Time) {
    this.reservarTurno.emit({ especialista, time });
  }

  CancelarTurno(especialista: Especialista, time: Time) {
    this.cancelarTurno.emit({ especialista, time });
  }

  public get Dia(): TurnoDia {
    return this.turnosDiaSolicitado;
  }

  public get MostrarTabla(): boolean {
    return !(typeof this.turnosDiaSolicitado === 'undefined');
  }

  ngOnInit() {
  }

}

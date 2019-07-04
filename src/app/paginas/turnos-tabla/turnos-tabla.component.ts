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

  private dia: TurnoDia;
  @Input('diaConsultado') diaConsultado: Date;
  @Input('turnosReservados') turnosReservados: any;
  @Input('especialista') especialista: Especialista;
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
    return this.dia;
  }

  ngOnInit() {
    // determinar el dia por input
    const especialista = new Especialista('asasdasd', 'asdadasd', 'asdasdasd');
    this.dia = new TurnoDia(this.diaConsultado, this.turnosReservados, especialista);
  }

}

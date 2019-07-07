import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialista } from './especialista';
import { IUsuarioId } from '../models/usuarioid.model';
import { Turno } from './turno';
import { ITurno } from '../models/turno.model';
import { TurnosService } from '../servicios/turnos.service';
import { ITurnoId } from '../models/turnoid.model';

export class TurnoDia {
  private dia: Date;
  private turnos: Observable<ITurnoId[]>;
  private especialista: string;

  constructor(dia: Date, turnos: Observable<ITurnoId[]>, especialista: string) {
    this.especialista = especialista;
    this.dia = dia;
    this.turnos = turnos;
    //this.completarHoras();
  }

  get Turnos(): Observable<ITurnoId[]> {
    return this.turnos;
  }

  get Dia(): Date {
    return this.dia;
  }

  get Especialista(): string {
    return this.especialista;
  }

}


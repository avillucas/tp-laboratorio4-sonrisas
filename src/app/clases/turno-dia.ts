import { TurnoHora } from './turno-hora';
import { environment } from 'src/environments/environment';
import { Especialista } from './especialista';

export class TurnoDia {
  private dia: Date;
  private reservados: any;
  private especialista: Especialista;
  private turnos: TurnoHora[];
  // Los turnos de un dia de un especialista
  constructor(dia: Date, turnosReservados: any, especialista: Especialista) {
    this.reservados = turnosReservados;
    this.especialista = especialista;
    this.turnos = [];
    this.dia = dia;
    this.completarHoras();
  }

  private completarHoras() {

    const fin: Date = new Date();
    const aux: Date = new Date();
    // domingo
    if (this.dia.getDay() === 6) {
      this.turnos = [];
    } else if (this.dia.getDay() === 5) {
      // sabado
      aux.setHours(environment.clinica.sab.inicio, 0, 0, 0);
      fin.setHours(environment.clinica.sab.fin, 0, 0, 0);
    } else {
      // es lav
      aux.setHours(environment.clinica.lav.inicio, 0, 0, 0);
      fin.setHours(environment.clinica.lav.fin, 0, 0, 0);
    }
    //
    do {
      const turno = new TurnoHora(aux);
      this.turnos.push(turno);
      aux.setMinutes(aux.getMinutes() + this.TiempoMinimoConsulta, 0, 0);
    } while (aux <= fin);
    //
    this.reservados.forEach(tomado => {

      console.info(tomado);
    });

  }

  get TiempoMinimoConsulta(): number {
    return environment.clinica.tiempoMinimoConsulta;
  }

  get Turnos(): TurnoHora[] {
    return this.turnos;
  }

  get Dia(): Date {
    return this.dia;
  }

  get Especialista(): Especialista {
    return this.especialista;
  }

}


import { Usuario } from './usuario';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { environment } from '../../environments/environment';
import { IRangoHorario } from '../models/rangohorario.model';
import { Helpers } from './helpers';
import { ITurno } from '../models/turno.model';

export class Especialista extends Usuario {
  constructor(email: string, nombre: string, profileImage: string) {
    super(email, nombre, TipoUsuario.especialista, profileImage);
  }

  static generarTurnosDisponiblesTodoElDia(dia: Date, especialista: Especialista): Array<ITurno> {
    // clonar la fecha para que no se aplique por referencia sobre la ingresada
    const rangoHorario: IRangoHorario = Helpers.traerRangoHorario(dia);
    const time: Date = new Date(rangoHorario.inicio);
    const turnos: Array<ITurno> = new Array<ITurno>();
    const TiempoMinimoConsulta = environment.clinica.tiempoMinimoConsulta;
    do {
      const turno = { time, especialistaNombre: especialista.Nombre } as ITurno;
      turnos.push(turno);
      time.setMinutes(time.getMinutes() + TiempoMinimoConsulta, 0, 0);
    } while (time <= rangoHorario.fin);
    return turnos;
  }

  public generarMisTurnosDisponiblesTodoElDia(dia: Date): Array<ITurno> {
    return Especialista.generarTurnosDisponiblesTodoElDia(dia, this);
  }
}

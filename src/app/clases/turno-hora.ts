import { Especialista } from './especialista';

export class TurnoHora {
  private time: Date;
  private especialistas: Especialista[];

  constructor(date: Date) {
    this.time = new Date(date);
  }

  get Especialistas(): Especialista[] {
    return this.especialistas;
  }

  AddEspecialista(especialista: Especialista) {
    return this.especialistas.push(especialista);
  }


  get Time(): Date {
    return this.time;
  }

}

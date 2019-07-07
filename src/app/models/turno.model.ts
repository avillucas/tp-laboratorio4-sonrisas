import { Time } from '@angular/common';

export interface ITurno {
  time: Date;
  especialistaUID:string;
  especialistaNombre: string;
  clienteUID?: string;
  clienteNombre?: string;
}


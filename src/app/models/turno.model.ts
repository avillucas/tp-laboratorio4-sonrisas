export interface ITurno {
  time: any;
  consultorio: string;
  especialistaUID: string;
  especialistaNombre: string;
  clienteUID?: string;
  clienteNombre?: string;
  asistio?: boolean;
  resena?: string;
}


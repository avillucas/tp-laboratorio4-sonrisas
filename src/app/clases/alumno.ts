import { Usuario } from './usuario';

export class Alumno extends Usuario {
  constructor(email: string, nombre: string) {
    super(email, nombre, false, false);
  }
}

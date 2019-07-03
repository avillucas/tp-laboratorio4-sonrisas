import { Usuario } from './usuario';

export class Profesor extends Usuario {
  constructor(email: string, nombre: string) {
    super(email, nombre, true, true);
  }
}

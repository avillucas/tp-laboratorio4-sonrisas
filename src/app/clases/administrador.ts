import { Usuario } from './usuario';

export class Administrador extends Usuario {
  constructor(email: string, nombre: string) {
    super(email, nombre, true, false);
  }
}

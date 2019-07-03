import { Usuario } from './usuario';

export class Cliente extends Usuario {
  constructor(email: string, nombre: string) {
    super(email, nombre);
  }
}

import { Usuario } from './usuario';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class Cliente extends Usuario {
  constructor(email: string, nombre: string) {
    super(email, nombre,TipoUsuario.cliente);
  }
}

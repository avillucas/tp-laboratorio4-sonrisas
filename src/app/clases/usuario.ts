import { IUsuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { IPersistible } from '../servicios/ipersistible.model';
import { Administrador } from './administrador';
import { Recepcionista } from './recepcionista';
import { Cliente } from './clientes';
import { Especialista } from './especialista';

export abstract class Usuario implements IPersistible {
  private uid: string;
  private email: string;
  private nombre: string;
  private tipo: TipoUsuario;

  constructor(email: string, nombre: string, tipo: TipoUsuario) {
    this.email = email;
    this.nombre = nombre;
    this.tipo = tipo;
  }

  public get esAdministrador(): boolean {
    return this.tipo == TipoUsuario.administrador;
  }

  public get esEspecialista(): boolean {
    return this.tipo == TipoUsuario.especialista;
  }

  public get esRecepcionista(): boolean {
    return this.tipo == TipoUsuario.recepcionista;
  }

  public get esCliente(): boolean {
    return this.tipo == TipoUsuario.cliente;
  }

  public set Email(value: string) {
    this.email = value;
  }

  public get Email(): string {
    return this.email;
  }

  public get Nombre(): string {
    return this.nombre;
  }

  public set Nombre(value: string) {
    this.nombre = value;
  }

  public get Tipo(): TipoUsuario {
    return this.tipo;
  }

  DAOData(usuario: Usuario): IUsuario {
    return {
      email: usuario.email,
      nombre: usuario.nombre,
      tipo: usuario.tipo
    };
  }

  DataDAO(iusuario: IUsuario): Usuario {
    if (iusuario.tipo == TipoUsuario.administrador) {
      return new Administrador(iusuario.email, iusuario.nombre);
    } else if (iusuario.tipo == TipoUsuario.especialista) {
      return new Especialista(iusuario.email, iusuario.nombre);
    } else if (iusuario.tipo == TipoUsuario.recepcionista) {
      return new Recepcionista(iusuario.email, iusuario.nombre);
    } else if (iusuario.tipo == TipoUsuario.cliente) {
      return new Cliente(iusuario.email, iusuario.nombre);
    }
  }


}

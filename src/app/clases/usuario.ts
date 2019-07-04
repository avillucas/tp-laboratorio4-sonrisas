import { TipoUsuario } from '../enums/tipo-usuario.enum';

export abstract class Usuario {
  private email: string;
  private nombre: string;
  private tipo: TipoUsuario;

  constructor(email: string, nombre: string, tipo: TipoUsuario) {
    this.email = email;
    this.nombre = nombre;
    this.tipo = tipo;
  }

  public get esAdministrador(): boolean {
    // tslint:disable-next-line: triple-equals
    return this.tipo == TipoUsuario.administrador;
  }

  public get esEspecialista(): boolean {
    // tslint:disable-next-line: triple-equals
    return this.tipo == TipoUsuario.especialista;
  }

  public get esRecepcionista(): boolean {
    // tslint:disable-next-line: triple-equals
    return this.tipo == TipoUsuario.recepcionista;
  }

  public get esCliente(): boolean {
    // tslint:disable-next-line: triple-equals
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

}

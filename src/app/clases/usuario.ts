import { IUsuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export abstract class Usuario {
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

  public get UID(): string {
    return this.uid;
  }

  public set UID(value: string) {
    this.uid = value;
  }

  public get Tipo(): string {
    return (this.profesor) ? 'Profesor' : (this.admin) ? 'Admin' : 'Alumno';
  }



  get DAOData(): IUsuario {
    return {
      uid: this.uid,
      email: this.email,
      nombre: this.nombre,
      admin: this.admin,
      profesor: this.profesor,
    };
  }

  get DAOIdentificador(): string {
    return this.uid;
  }

  get DAOReferencia(): string {
    return `${environment.db.usuarios} /${this.DAOIdentificador}`;
  }

  /*
    DAOFromMap(map: any): Usuario {
      //return new Usuario();
    }

    DAOtoMap(): any {

    }
    */
}

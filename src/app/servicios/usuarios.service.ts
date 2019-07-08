import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { IUsuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUsuarioId } from '../models/usuarioid.model';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { Administrador } from '../clases/administrador';
import { Especialista } from '../clases/especialista';
import { Recepcionista } from '../clases/recepcionista';
import { Cliente } from '../clases/clientes';
import { ITurno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  private collection: AngularFirestoreCollection<IUsuario>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection(environment.db.usuarios);
  }

  static DAOData(usuario: Usuario): IUsuario {
    return {
      email: usuario.Email,
      nombre: usuario.Nombre,
      tipo: usuario.Tipo
    };
  }

  static esCliente(iusuario: IUsuario): boolean {
    // tslint:disable-next-line: triple-equals
    return (iusuario.tipo == TipoUsuario.cliente);
  }

  static esEspecialista(iusuario: IUsuario): boolean {
    // tslint:disable-next-line: triple-equals
    return (iusuario.tipo == TipoUsuario.especialista);
  }

  static esRecepcionista(iusuario: IUsuario): boolean {
    // tslint:disable-next-line: triple-equals
    return (iusuario.tipo == TipoUsuario.recepcionista);
  }

  static DataDAO(iusuario: IUsuario): Usuario {
    // tslint:disable-next-line: triple-equals
    if (iusuario.tipo == TipoUsuario.administrador) {
      return new Administrador(iusuario.email, iusuario.nombre, iusuario.profileImage);
      // tslint:disable-next-line: triple-equals
    } else if (iusuario.tipo == TipoUsuario.especialista) {
      // tslint:disable-next-line: triple-equals
      return new Especialista(iusuario.email, iusuario.nombre, iusuario.profileImage);
      // tslint:disable-next-line: triple-equals
    } else if (iusuario.tipo == TipoUsuario.recepcionista) {
      return new Recepcionista(iusuario.email, iusuario.nombre, iusuario.profileImage);
      // tslint:disable-next-line: triple-equals
    } else if (iusuario.tipo == TipoUsuario.cliente) {
      return new Cliente(iusuario.email, iusuario.nombre, iusuario.profileImage);
    }
  }

  get Collection(): AngularFirestoreCollection<IUsuario> {
    return this.collection;
  }

  traerPorTipo(tipo: TipoUsuario): Observable<IUsuarioId[]> {
    // tslint:disable-next-line: radix
    const tipoNro = parseInt(tipo.toString());
    // tslint:disable-next-line:max-line-length
    const colection: AngularFirestoreCollection<IUsuario> = this.afs.collection(environment.db.usuarios, ref => ref.where('tipo', '==', tipoNro));
    return this.makeObservables(colection);
  }

  private makeObservables(collection: AngularFirestoreCollection<IUsuario>) {
    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return this.usuarioAUsuarioId(a);
        });
      }));
  }

  private makeObservable(document: AngularFirestoreDocument<IUsuario>) {
    return document.snapshotChanges().pipe(
      map(a => {
        return this.usuarioAUsuarioId(a);
      }));
  }

  private usuarioAUsuarioId(a): IUsuarioId {
    const iusuario = a.payload.doc.data() as IUsuario;
    const usuario = UsuariosService.DataDAO(iusuario);
    const id = a.payload.doc.id;
    return { id, usuario } as IUsuarioId;
  }

  get Observable() {
    return this.makeObservables(this.collection);
  }

  crear(usuario: Usuario, UID: string) {
    const iusuario = UsuariosService.DAOData(usuario);
    return this.collection.doc(UID).set(iusuario);
  }

  borrar(id: string) {
    // TODO eliminar tambien la relacion con las demas cosas y la relacion con el auth
    return this.collection.doc(id).delete();
  }

  actualizar(id: string, usuario: Usuario) {
    const userRef: AngularFirestoreDocument<IUsuario> = this.afs.doc(`${environment.db.usuarios}/${id}`);
    const imateria = UsuariosService.DAOData(usuario);
    return userRef.set(imateria, { merge: true });
  }

  traerEspecialistas(): Observable<IUsuarioId[]> {
    return this.traerPorTipo(TipoUsuario.especialista);
  }

  traerClientes(): Observable<IUsuarioId[]> {
    return this.traerPorTipo(TipoUsuario.cliente);
  }

  traerPorUID(UID: string) {
    const collection: AngularFirestoreDocument<IUsuario> = this.afs.collection(environment.db.usuarios).doc(UID);
    return this.makeObservable(collection);
  }

  agregarTurnosAEspecialista(especialistaUID: string, turnos: Array<ITurno>) {
    turnos.forEach(iturno => {
      const turnoRef = this.collection.doc(especialistaUID).collection('turnos').add(iturno);
    });

  }

}

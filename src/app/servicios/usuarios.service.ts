import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {

  private collection: AngularFirestoreCollection<IUsuario>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection(environment.db.usuarios);
  }

  get Collection(): AngularFirestoreCollection<IUsuario> {
    return this.collection;
  }

  traerPorTipo(tipo: TipoUsuario): Observable<IUsuarioId[]> {
    // tslint:disable-next-line: radix
    const tipoNro = parseInt(tipo.toString());
    // tslint:disable-next-line:max-line-length
    const colection: AngularFirestoreCollection<IUsuario> = this.afs.collection(environment.db.usuarios, ref => ref.where('tipo', '==', tipoNro));
    return this.makeObservable(colection);
  }

  private makeObservable(collection: AngularFirestoreCollection<IUsuario>) {
    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const iusuario = a.payload.doc.data() as IUsuario;
          const usuario = this.DataDAO(iusuario);
          const id = a.payload.doc.id;
          return { id, usuario } as IUsuarioId;
        });
      }));
  }

  get Observable() {
    return this.makeObservable(this.collection);
  }

  crear(usuario: Usuario, UID: string) {
    const iusuario = this.DAOData(usuario);
    return this.collection.doc(UID).set(iusuario);
  }

  borrar(id: string) {
    return this.collection.doc(id).delete();
  }

  actualizar(id: string, usuario: Usuario) {
    const userRef: AngularFirestoreDocument<IUsuario> = this.afs.doc(`${environment.db.usuarios}/${id}`);
    const imateria = this.DAOData(usuario);
    return userRef.set(imateria, { merge: true });
  }


  DAOData(usuario: Usuario): IUsuario {
    return {
      email: usuario.Email,
      nombre: usuario.Nombre,
      tipo: usuario.Tipo
    };
  }

  DataDAO(iusuario: IUsuario): Usuario {
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

  async traerPorUID(UID: string) {
    const userRef: AngularFirestoreDocument<IUsuario> = this.afs.collection(environment.db.usuarios).doc(UID);
    return await userRef.get().subscribe(doc => {
      if (doc.exists) {
        return this.DataDAO(doc.data() as IUsuario);
      }
      return null;
    });
  }

}

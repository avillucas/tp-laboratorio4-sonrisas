import { Injectable } from '@angular/core';
import { ITurno } from '../models/turno.model';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { IUsuarioId } from '../models/usuarioid.model';
import { ITurnoId } from '../models/turnoid.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turno } from '../clases/turno';
import { IUsuario } from '../models/usuario.model';
import { Usuario } from '../clases/usuario';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { Administrador } from '../clases/administrador';
import { Especialista } from '../clases/especialista';
import { Recepcionista } from '../clases/recepcionista';
import { Cliente } from '../clases/clientes';
import { Helpers } from '../clases/helpers';
import { IRangoHorario } from '../models/rangohorario.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private collection: AngularFirestoreCollection<ITurno>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection(environment.db.turnos);
  }

  get Collection(): AngularFirestoreCollection<ITurno> {
    return this.collection;
  }

  static estaReservado(iturnoid: ITurnoId): boolean {
    return (typeof iturnoid.turno.clienteUID !== 'undefined');
  }

  static DAOData(turno: Turno): ITurno {
    return {
      time: turno.Time
    };
  }

  static DataDAO(iturno: ITurno): Turno {
    const fecha = iturno.time.toDate();
    return new Turno(fecha);
  }


  static generarTurnosDisponiblesTodoElDia(dia: Date): Array<ITurno> {
    const aux = new Date(dia);
    const rangoHorario: IRangoHorario = Helpers.traerRangoHorario(aux);
    const time: Date = new Date(rangoHorario.inicio);
    const turnos: Array<ITurno> = new Array<ITurno>();
    const TiempoMinimoConsulta = environment.clinica.tiempoMinimoConsulta;
    do {
      const nTime = new Date(time);
      const turno = { time: nTime } as ITurno;
      turnos.push(turno);
      time.setMinutes(time.getMinutes() + TiempoMinimoConsulta, 0, 0);
    } while (time <= rangoHorario.fin);
    return turnos;
  }


  Reservar(turnoID: string, iturno: ITurno, especialistaUID: string) {
    this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(especialistaUID)
      .collection<ITurno>(environment.collections.usuarios.turnos).doc(turnoID).set(iturno);
  }

  registrarResena(turnoID: string, iturno: ITurno, especialistaUID: string) {
    this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(especialistaUID)
      .collection<ITurno>(environment.collections.usuarios.turnos).doc(turnoID).set(iturno);
  }

  traerPorDiaEspecialista(diaConsultado: Date, especialistaUID: string): Observable<ITurnoId[]> {
    const inicioBusqueda: Date = new Date(diaConsultado);
    const finBusqueda: Date = new Date(diaConsultado);
    inicioBusqueda.setHours(0, 0, 0, 0);
    finBusqueda.setHours(23, 59, 59, 59);
    //
    const colection: AngularFirestoreCollection<ITurno> = this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(especialistaUID)
      .collection<ITurno>(environment.collections.usuarios.turnos, ref => ref
        .where('time', '>', inicioBusqueda)
        .where('time', '<', finBusqueda)
        .orderBy('time')
      );
    return this.makeObservable(colection);
  }

  private makeObservable(collection: AngularFirestoreCollection<ITurno>) {
    return collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const iturno = a.payload.doc.data() as ITurno;
          const id = a.payload.doc.id;
          return { id, turno: iturno } as ITurnoId;
        });
      }));
  }

  get Observable() {
    return this.makeObservable(this.collection);
  }

  crear(turno: Turno) {
    const iturno = TurnosService.DAOData(turno);
    return this.collection.add(iturno);
  }

  borrar(id: string) {
    return this.collection.doc(id).delete();
  }

  actualizar(id: string, turno: Turno) {
    const userRef: AngularFirestoreDocument<ITurno> = this.afs.doc(`${environment.db.turnos}/${id}`);
    const iturno = TurnosService.DAOData(turno);
    return userRef.set(iturno, { merge: true });
  }


}


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
import { Helpers } from '../clases/helpers';
import { IRangoHorario } from '../models/rangohorario.model';
import { Consultorios } from '../enums/consultorios.enum';
import { firestore } from 'firebase/app';

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

  static seAsistio(iturnoid: ITurnoId): boolean {
    return typeof iturnoid.turno.asistio !== 'undefined'
  }

  static reservadoPorUsuario(iturnoid: ITurnoId, clienteUID: string): boolean {
    return (iturnoid.turno.clienteUID === clienteUID);
  }

  static esCancelablePorUsuario(iturnoid: ITurnoId, clienteUID: string) {
    return (!TurnosService.seAsistio(iturnoid) && TurnosService.reservadoPorUsuario(iturnoid, clienteUID));
  }

  static generarId(nTime: Date, consultorio: Consultorios): string {
    const consultorioStr = Consultorios[consultorio].toString();
    return nTime.getTime() + consultorioStr;
  }

  static DataDAO(iturno: ITurno): Turno {
    const fecha = iturno.time.toDate();
    return new Turno(fecha);
  }

  static generarTurnosDisponiblesTodoElDia(dia: Date, consultorio: Consultorios, especialista: IUsuarioId): Array<ITurnoId> {
    const aux = new Date(dia);
    const rangoHorario: IRangoHorario = Helpers.traerRangoHorario(aux);
    const time: Date = new Date(rangoHorario.inicio);
    const iturnosid: Array<ITurnoId> = new Array<ITurnoId>();
    const TiempoMinimoConsulta = environment.clinica.tiempoMinimoConsulta;
    do {
      const nTime = new Date(time);
      const consultorioStr = Consultorios[consultorio].toString();
      const id = TurnosService.generarId(nTime, consultorio);
      const iturnoid = {
        id,
        turno: {
          time: nTime,
          consultorio: consultorioStr,
          especialistaUID: especialista.id,
          especialistaNombre: especialista.usuario.Nombre
        } as ITurno
      } as ITurnoId;
      iturnosid.push(iturnoid);
      time.setMinutes(time.getMinutes() + TiempoMinimoConsulta, 0, 0);
    } while (time <= rangoHorario.fin);
    return iturnosid;
  }

  //TODO averiguar como hacer esto correctamente
  public static tieneCliente(iturnoid: ITurnoId) {
    if (typeof iturnoid.turno.clienteUID === 'undefined' || typeof iturnoid.turno.clienteNombre === 'undefined') {
      throw Error('El turno no tiene el cliente a quien se lo debe reservar ');
    }
  }

  public Reservar(iturnoid: ITurnoId): Promise<void> {
    TurnosService.tieneCliente(iturnoid);
    // actualizar el turno en el especialista
    return this.actualizarTurno(iturnoid).then(res => {
      // crear la reserva en el cliente
      return this.actualizarReserva(iturnoid);
    });
  }

  public Cancelar(iturnoid: ITurnoId): Promise<void> {
    // eliminar la reserva en el cliente
    return this.eliminarReserva(iturnoid).then(res => {
      return this.cancelarTurno(iturnoid);
    });

  }

  private cancelarTurno(iturnoid: ITurnoId): Promise<void> {
    return this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(iturnoid.turno.especialistaUID)
      .collection<ITurno>(environment.collections.usuarios.turnos)
      .doc(iturnoid.id)
      .update({
        clienteUID: firestore.FieldValue.delete(),
        clienteNombre: firestore.FieldValue.delete(),
      });
  }

  private eliminarReserva(iturnoid: ITurnoId): Promise<void> {
    TurnosService.tieneCliente(iturnoid);
    return this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(iturnoid.turno.clienteUID)
      .collection<ITurno>(environment.collections.usuarios.reservas)
      .doc(iturnoid.id).delete();
  }


  private actualizarTurno(iturnoid: ITurnoId): Promise<void> {
    return this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(iturnoid.turno.especialistaUID)
      .collection<ITurno>(environment.collections.usuarios.turnos)
      .doc(iturnoid.id)
      .set(iturnoid.turno);
  }

  private actualizarReserva(iturnoid: ITurnoId): Promise<void> {
    TurnosService.tieneCliente(iturnoid);
    return this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(iturnoid.turno.clienteUID)
      .collection<ITurno>(environment.collections.usuarios.reservas)
      .doc(iturnoid.id)
      .set(iturnoid.turno);
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

  traerReservasPorUsuario(usuarioUID: string): Observable<ITurnoId[]> {
    const colection: AngularFirestoreCollection<ITurno> = this.afs.collection(environment.db.usuarios)
      .doc<IUsuario>(usuarioUID)
      .collection<ITurno>(environment.collections.usuarios.reservas, ref => ref.orderBy('time')
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

}


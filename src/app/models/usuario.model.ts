export interface IUsuario {
  profileImage?: string;
  email: string;
  nombre: string;
  tipo: number;
  // el como especialista los que tiene asignados son turnos
  turnos?: any;
  // el como cliente los que tiene reservados son reservas
  reservas?: any;
}

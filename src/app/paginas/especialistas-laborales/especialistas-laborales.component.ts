import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../clases/especialista';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ITurno } from '../../models/turno.model';

@Component({
  selector: 'app-especialistas-laborales',
  templateUrl: './especialistas-laborales.component.html',
  styleUrls: ['./especialistas-laborales.component.css']
})
export class EspecialistasLaboralesComponent implements OnInit {

  constructor(private uService: UsuariosService) { }

  private diaConsultado: Date;
  private especialista: string;

  aplicarFiltros(eventData: any) {
    this.diaConsultado = new Date(eventData.fecha + ' 00:00:00');
    this.especialista = eventData.especialistaUID;
  }

  Cargar() {
    const turnos: Array<ITurno> = TurnosService.generarTurnosDisponiblesTodoElDia(this.diaConsultado);
    this.uService.agregarTurnosAEspecialista(this.especialista, turnos);
  }

  public get DiaConsultado(): Date {
    return this.diaConsultado;
  }

  ngOnInit() {
  }

}

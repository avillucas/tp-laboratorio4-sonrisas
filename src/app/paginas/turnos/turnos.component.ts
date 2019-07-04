import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { ActivatedRoute } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  private diaConsultado: Date;
  private turnosReservados: any;
  private especialista: Especialista;
  private sub: any;

  constructor(
    private tService: TurnosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.diaConsultado = new Date();
    this.turnosReservados = this.tService.traerPorDia(this.diaConsultado);
  }

  public get TurnosReservados() {
    return this.turnosReservados;
  }

  public get DiaConsultado(): Date {
    return this.diaConsultado;
  }

  public get Especialista() {
    return this.especialista;
  }

  aplicarFiltros(diaConsultado: Date) {
    this.diaConsultado = new Date(diaConsultado);
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (typeof params['fecha'] !== 'undefined') {
        this.diaConsultado = new Date(params['fecha']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

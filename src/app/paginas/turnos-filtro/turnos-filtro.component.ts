import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos-filtro',
  templateUrl: './turnos-filtro.component.html',
  styleUrls: ['./turnos-filtro.component.css']
})
export class TurnosFiltroComponent implements OnInit {

  @Output() filtrosAplicados = new EventEmitter();

  public DiaConsultadoControl: FormControl;
  public FiltroForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router
  ) {
    this.DiaConsultadoControl = new FormControl(this.DiaConsultadoControl, [Validators.required]);
    this.FiltroForm = this.builder.group({ diaConsultado: this.DiaConsultadoControl });
  }

  public get DiaConsultadoInput() {
    return this.FiltroForm.get('diaConsultado');
  }

  Filtrar() {
    const fecha = new Date(this.DiaConsultadoInput.value);
    const fechaStr: string = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear();
    this.filtrosAplicados.emit(fecha);
  }

  ngOnInit() {
    const dia = new Date();
    this.DiaConsultadoInput.setValue(dia);
  }


}

import { Observable } from 'rxjs';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsuarioId } from '../../../models/usuarioid.model';
import { UsuariosService } from '../../../servicios/usuarios.service';
@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {
  @Output() filtrosAplicados = new EventEmitter();

  public DiaConsultadoControl: FormControl;
  public FiltroForm: FormGroup;

  constructor(
    private builder: FormBuilder,
  ) {
    this.DiaConsultadoControl = new FormControl(this.DiaConsultadoControl, [Validators.required]);
    this.FiltroForm = this.builder.group({ diaConsultado: this.DiaConsultadoControl });
  }

  public get DiaConsultadoInput() {
    return this.FiltroForm.get('diaConsultado');
  }

  Filtrar() {
    const fecha = this.DiaConsultadoInput.value;
    this.filtrosAplicados.emit(fecha);
  }

  ngOnInit() {
  }
}

import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from '../../clases/especialista';
import { UsuariosService } from '../../servicios/usuarios.service';
import { IUsuarioId } from '../../models/usuarioid.model';
import { IUsuario } from 'src/app/models/usuario.model';
import { Helpers } from '../../clases/helpers';

@Component({
  selector: 'app-turnos-filtro',
  templateUrl: './turnos-filtro.component.html',
  styleUrls: ['./turnos-filtro.component.css']
})
export class TurnosFiltroComponent implements OnInit {

  @Output() filtrosAplicados = new EventEmitter();

  public DiaConsultadoControl: FormControl;
  public EspecialistaControl: FormControl;
  public FiltroForm: FormGroup;
  private especialistas: Observable<IUsuarioId[]>;
  private ocultarSelectorFechas: boolean;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private eService: UsuariosService
  ) {
    this.ocultarSelectorFechas = true;
    this.especialistas = this.eService.traerEspecialistas();
    this.DiaConsultadoControl = new FormControl(this.DiaConsultadoControl, [Validators.required]);
    this.EspecialistaControl = new FormControl(this.EspecialistaControl, [Validators.required]);
    this.FiltroForm = this.builder.group({ diaConsultado: this.DiaConsultadoControl, especialista: this.EspecialistaControl });
  }

  public get DiaConsultadoInput() {
    return this.FiltroForm.get('diaConsultado');
  }

  public get EspecialistasInput() {
    return this.FiltroForm.get('especialista');
  }

  public get Especialistas(): Observable<IUsuarioId[]> {
    return this.especialistas;
  }

  public get OcultarSelectorFechas(): boolean {
    return this.ocultarSelectorFechas;
  }

  Filtrar() {
    const fecha = this.DiaConsultadoInput.value;
    const especialistaUID = this.EspecialistasInput.value;
    this.filtrosAplicados.emit({ fecha, especialistaUID });
  }

  EspecialistaSeleccionado() {
    const especialista: IUsuarioId = this.EspecialistasInput.value;
    this.ocultarSelectorFechas = false;
    // TODO filtrar fechas disponibles por especialista y bloquearlas en el selecctor
  }

  ngOnInit() {
    //this.DiaConsultadoInput.setValue(Helpers.toSlashes(new Date()));
  }


}

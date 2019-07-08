import { Observable } from 'rxjs';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsuarioId } from '../../../models/usuarioid.model';
import { UsuariosService } from '../../../servicios/usuarios.service';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {

  @Output() filtrosAplicados = new EventEmitter();

  public EspecialistaControl: FormControl;
  public FiltroForm: FormGroup;
  private especialistas: Observable<IUsuarioId[]>;

  constructor(
    private builder: FormBuilder,
    private eService: UsuariosService
  ) {
    this.especialistas = this.eService.traerEspecialistas();
    this.EspecialistaControl = new FormControl(this.EspecialistaControl, [Validators.required]);
    this.FiltroForm = this.builder.group({ especialista: this.EspecialistaControl });
  }
  public get EspecialistasInput() {
    return this.FiltroForm.get('especialista');
  }

  public get Especialistas(): Observable<IUsuarioId[]> {
    return this.especialistas;
  }


  Filtrar() {
    // TODO devolver todo el especialista
    const eUID = this.EspecialistasInput.value;
    this.filtrosAplicados.emit({ eUID });
  }


  ngOnInit() {
  }
}

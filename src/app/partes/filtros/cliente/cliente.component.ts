import { Observable } from 'rxjs';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsuarioId } from '../../../models/usuarioid.model';
import { UsuariosService } from '../../../servicios/usuarios.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Output() filtrosAplicados = new EventEmitter();

  public ClientesControl: FormControl;
  public FiltroForm: FormGroup;
  private especialistas: Observable<IUsuarioId[]>;

  constructor(
    private builder: FormBuilder,
    private eService: UsuariosService
  ) {
    this.especialistas = this.eService.traerClientes();
    this.ClientesControl = new FormControl(this.ClientesControl, [Validators.required]);
    this.FiltroForm = this.builder.group({ especialista: this.ClientesControl });
  }
  public get ClienteInput() {
    return this.FiltroForm.get('clientes');
  }

  public get Especialistas(): Observable<IUsuarioId[]> {
    return this.especialistas;
  }


  Filtrar() {
    // TODO devolver todo el especialista
    const eUID = this.ClientesControl.value;
    this.filtrosAplicados.emit({ eUID });
  }

  ngOnInit() {
  }
}

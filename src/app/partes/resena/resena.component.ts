import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITurnoId } from '../../models/turnoid.model';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TurnosService } from '../../servicios/turnos.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent implements OnInit {

  @Input() turno: ITurnoId;
  @Output() ResenaGenerada = new EventEmitter();

  public ResenaControl: FormControl;
  public VisitaForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private tService: TurnosService,
  ) {
    this.ResenaControl = new FormControl(this.ResenaControl, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(255)
    ]);


    this.VisitaForm = this.builder.group({
      resena: this.ResenaControl
    });
  }

  public get ResenaInput() {
    return this.VisitaForm.get('resena');
  }

  Registrar() {
    const resena = this.ResenaInput.value;
    const iturnoid: ITurnoId = this.turno;
    this.ResenaGenerada.emit({ resena, iturnoid });
  }

  private reset() {
    this.ResenaInput.setValue('');
    this.turno = null;
  }

  ngOnInit() {
    this.reset();
  }
}

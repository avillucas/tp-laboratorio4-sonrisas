import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { Profesor } from 'src/app/clases/profesor';
import { Administrador } from 'src/app/clases/administrador';
import { Alumno } from 'src/app/clases/alumno';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {

  public NombreControl: FormControl;
  public EmailControl: FormControl;
  public PasswordControl: FormControl;
  public TipoControl: FormControl;
  public RegistroForm: FormGroup;


  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router) {
    this.NombreControl = new FormControl(this.NombreControl, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255)
    ]);

    this.EmailControl = new FormControl(this.EmailControl, [
      Validators.required,
      Validators.email,
      Validators.minLength(1),
      Validators.maxLength(255)
    ]);

    this.PasswordControl = new FormControl(this.PasswordControl, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255)
    ]);

    this.TipoControl = new FormControl(this.TipoControl, [
      Validators.required
    ]);

    this.RegistroForm = this.builder.group({
      nombre: this.NombreControl,
      email: this.EmailControl,
      password: this.PasswordControl,
      tipo: this.TipoControl,
    });
  }

  public get NombreInput() {
    return this.RegistroForm.get('nombre');
  }

  public get EmailInput() {
    return this.RegistroForm.get('email');
  }

  public get PasswordInput() {
    return this.RegistroForm.get('password');
  }

  public get TipoInput() {
    return this.RegistroForm.get('tipo');
  }

  private crear(email: string, nombre: string, tipo: TipoUsuario): Usuario {
    // tslint:disable-next-line:triple-equals
    if (tipo == TipoUsuario.profesor) {
      return new Profesor(email, nombre);
      // tslint:disable-next-line:triple-equals
    } else if (tipo == TipoUsuario.admin) {
      return new Administrador(email, nombre);
    } else {
      return new Alumno(email, nombre);
    }
  }

  Registrar() {
    const usuario: Usuario = this.crear(this.EmailInput.value, this.NombreInput.value, this.TipoInput.value);
    this.authService.clienteSingIn(usuario, this.PasswordInput.value).then(res => {
      this.router.navigate(['']);
    }, err => {
      alert('Error en las credenciales, por favor intente con otro usuario ');
    }
    );
  }


  ngOnInit() {
    this.TipoInput.setValue(0);
  }

}

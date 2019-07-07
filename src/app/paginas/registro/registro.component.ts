import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { IUsuario } from 'src/app/models/usuario.model';
import { StorageService } from 'src/app/servicios/storage.service';

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
  public AvatarControl: FormControl;
  public RegistroForm: FormGroup;
  private tiposUsuario: TipoUsuario[];

  private profileImage: string;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private uService: UsuariosService,
    private sService: StorageService
  ) {
    this.tiposUsuario = [TipoUsuario.administrador, TipoUsuario.especialista, TipoUsuario.recepcionista, TipoUsuario.cliente];
    this.NombreControl = new FormControl(this.NombreControl, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(255)
    ]);

    this.EmailControl = new FormControl(this.EmailControl, [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(255)
    ]);

    this.PasswordControl = new FormControl(this.PasswordControl, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(255)
    ]);

    this.TipoControl = new FormControl(this.TipoControl, [
      Validators.required
    ]);

    this.AvatarControl = new FormControl(this.AvatarControl, [
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

  public get AvatarInput() {
    return this.RegistroForm.get('avatar');
  }

  private crear(email: string, nombre: string, tipo: TipoUsuario, profileImage: string): Usuario {
    return UsuariosService.DataDAO({ email, nombre, tipo, profileImage } as IUsuario
    );
  }

  Registrar() {
    const usuario: Usuario = this.crear(this.EmailInput.value, this.NombreInput.value, this.TipoInput.value, this.profileImage);
    this.authService.clienteSingIn(usuario, this.PasswordInput.value).then(res => {
      this.router.navigate(['']);
    }, err => {
      alert('Error en las credenciales, por favor intente con otro usuario ');
    }
    );
  }

  public get TiposUsuario(): TipoUsuario[] {
    return this.tiposUsuario;
  }

  public DefinirAvatar($event) {
    this.sService.uploadFileOnEvent($event);
    this.sService.uploadPercent.subscribe({
      next(data) { console.log('porcentaje: ' + data); }
    });
    this.sService.downloadURL.subscribe(url => this.profileImage = url);
  }

  ngOnInit() {
    this.TipoInput.setValue(0);
  }

}

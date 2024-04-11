import { Component, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUsers } from '../models/users.model';
import { People } from '../models/people.model';
import { UsuarioService } from '../services/usuario.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent {
  formUsuario: FormGroup;

  private user: IUsers = {} as IUsers;
  private people: People = {} as People;
  private _UserServ = inject(UsuarioService);
  mensaje: string = '';
  mensajes: string = '';
  prueba: boolean = false;
  private _router = inject(Router);
  private _apiservis = inject(ApiService);

  constructor(private form: FormBuilder) {
    this.formUsuario = this.form.group({
      id_people: ['', Validators.required],
      name_people: ['', Validators.required],
      lastname: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      nameuser: ['', Validators.required],
      repPassword: ['', Validators.required],
      password: ['', Validators.required],
      post: ['', Validators.required],
    });
  }

  public enviar() {
    this.people.id_people = this.formUsuario.get('id_people')?.value;
    this.people.name_people = this.formUsuario.get('name_people')?.value;
    this.people.lastname = this.formUsuario.get('lastname')?.value;
    this.people.telephone = this.formUsuario.get('telephone')?.value;
    this.people.email = this.formUsuario.get('email')?.value;

    this.user.nameuser = this.formUsuario.get('nameuser')?.value;
    this.user.post = this.formUsuario.get('post')?.value;
    this.user.password = this.formUsuario.get('password')?.value;

    this._apiservis.getUsuario(this.user.nameuser).subscribe({
      next: (data) => {
        if (data != null) {
          this.prueba = true;
          this.mensaje = 'Nombre de usuario ya existe';
        } else {
          if (this.formUsuario.valid) {
            if (
              this.user.password === this.formUsuario.get('repPassword')?.value
            ) {
              this.prueba = false;
              this._UserServ.PostPeople(this.user, this.people).subscribe({
                next: (data) => {
                  this._router.navigate(['menu']);
                  this._apiservis.setVar(
                    'Usuario ingresado correctamente',
                    false
                  );
                },
                error: (err) => {
                  console.log(err);
                  this.prueba = true;
                  this.mensaje = 'Cedula usuario ya esta registrada';
                },
              });
            } else {
              this.prueba = true;
              this.mensaje = 'Contraseñas no coinciden';
            }
          } else {
            this.prueba = true;
            this.mensaje = 'Por favor, completa todos los campos obligatorios.';
          }
        }
      },
      error: (err) => {
        console.error('El eror es: ' + err);
      },
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formUsuario.get(controlName)?.hasError(errorType) &&
      this.formUsuario.get(controlName)?.touched
    );
  }
}

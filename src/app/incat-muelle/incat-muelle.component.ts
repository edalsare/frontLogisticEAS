import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { MuelleComponent } from '../ubicacion/muelle/muelle.component';
import { CategoriaComponent } from '../productos/categoria/categoria.component';
import { AlertOkComponent } from '../alerts/alert-ok/alert-ok.component';
import { AlertFailComponent } from '../alerts/alert-fail/alert-fail.component';

@Component({
  selector: 'app-incat-muelle',
  standalone: true,
  imports: [MenuComponent, 
  ReactiveFormsModule,
  CommonModule,MuelleComponent,
  CategoriaComponent,
  AlertOkComponent,
  AlertFailComponent],
  templateUrl: './incat-muelle.component.html',
  styleUrl: './incat-muelle.component.css'
})
export class IncatMuelleComponent {

  mensaje: string = "";
  formUsuario: FormGroup;
  ban: boolean = false;
  banOk: boolean= true;

  constructor(private form: FormBuilder) {
    this.formUsuario = this.form.group({
      id_people: ['',Validators.required],
      name_people: ['',Validators.required],
      lastname: ['',Validators.required],
      telephone: ['',Validators.required],
      email: ['',Validators.required],
      nameuser: ['',Validators.required],
      repPassword: ['',Validators.required],
      password: ['',Validators.required],
      post: ['',Validators.required]
    });
  }

  enviar(){}
  hasErrors(controlName: string, errorType: string) {
    return (
      this.formUsuario.get(controlName)?.hasError(errorType) &&
      this.formUsuario.get(controlName)?.touched
    );
  }

  manejarMensaje(mensaje: string){
    this.mensaje = mensaje;
  }

  manejarBan(ban: boolean){
    this.ban = ban;
    this.banOk = ban;
  }

}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IUsers } from './models/users.model';
import { ApiService } from './services/api.service';
import { error } from 'jquery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontLogisticEAS';

  fromularioLogin: FormGroup;
  newUsuario?: IUsers;
  

  usuario: string ='';
  password: string ='';
  prueba: boolean = false;
  mensaje: string = '';

  constructor(private form: FormBuilder, private _apiService: ApiService) {
    this.fromularioLogin = this.form.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  enviar() {
    this.usuario = this.fromularioLogin.get('usuario')?.value;
    this.password = this.fromularioLogin.get('password')?.value;
    

    this._apiService.getUsuario(this.usuario).subscribe((data: IUsers) =>{
       console.log(data);
      if(data == null){
        this.prueba = true;
        this.mensaje = "Error, Usuario incorrecto"
        console.log("Usuario incorrecto");
      }else if(data.password != this.password){
        this.prueba = true;
        this.mensaje = "Error, Contraseña incorrecta"
        console.log("contraseña incorrecto");
      }else{
        this.prueba = false;
        this.mensaje = " "
        this.newUsuario = data;
        }
      
    })
    console.log(this.fromularioLogin.status);
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.fromularioLogin.get(controlName)?.hasError(errorType) &&
      this.fromularioLogin.get(controlName)?.touched
    );
  }

 
}

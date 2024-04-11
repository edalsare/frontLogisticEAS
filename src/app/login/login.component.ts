import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsers } from '../models/users.model';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fromularioLogin: FormGroup;
  
  

  usuario: string ='';
  password: string ='';
  prueba: boolean = false;
  mensaje: string = '';

  private _serviceUsuario = inject(UsuarioService)

  private _router = inject(Router)
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
      if(data == null){
        this.prueba = true;
        this.mensaje = "Error, Usuario incorrecto"
      }else if(data.password != this.password){
        this.prueba = true;
        this.mensaje = "Error, Contraseña incorrecta"
      }else{
        this.prueba = false;
        this.mensaje = " "
        this._serviceUsuario.setUsuario(data);
        this._serviceUsuario.newUsuario.emit(data);
        this._router.navigate(['menu']);
        }
      
    })
    
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.fromularioLogin.get(controlName)?.hasError(errorType) &&
      this.fromularioLogin.get(controlName)?.touched
    );
  }


}

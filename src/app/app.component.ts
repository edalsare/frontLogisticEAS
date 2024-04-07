import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IUsers } from './models/users.model';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{

  title = 'frontLogisticEAS';
  newUsuario?: IUsers;
  private _serviceUsuario = inject(UsuarioService)
  ngOnInit(): void {
    this._serviceUsuario.newUsuario.subscribe(
      data =>{ this.newUsuario = data; }
    )
  } 
   public setUsuario(usuario: IUsers){
    this.newUsuario =usuario
   }
    
}

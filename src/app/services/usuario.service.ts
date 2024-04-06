import { Injectable, inject } from '@angular/core';
import { IUsers } from '../models/users.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario?: IUsers;
  //_iusario = inject(AppComponent)
  constructor() { }

  public setUsuario(usuario: IUsers){
    this.usuario = usuario
  }
  public getUsario(){
    //this._iusario.setUsuario(this.usuario);
    return this.usuario
  }
  
}

import { EventEmitter, Injectable, Output, inject} from '@angular/core';
import { IUsers } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  @Output() newUsuario: EventEmitter<IUsers> = new EventEmitter();
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

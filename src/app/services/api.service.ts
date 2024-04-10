import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/users/names';
  private mensaje: string = '';
  private ban: boolean = true;
  constructor(private _HttpClient: HttpClient) {}

  @Output() newMensaje: EventEmitter<IUsers> = new EventEmitter();

  public getUsuario(name: string): Observable<IUsers> {
    return this._HttpClient.get<IUsers>(`${this.baseUrl}?name=${name}`);
  }

  public setVar(mensaje: string, ban: boolean){
    this.mensaje = mensaje;
    this.ban = ban;
  }

  public getMensaje(){
    return this.mensaje;
  }

  public getBan(){
    return this.ban;
  }
}

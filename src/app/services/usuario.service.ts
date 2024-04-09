import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { IUsers } from '../models/users.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from '../models/people.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8000/people/';
  _HTTPClient = inject(HttpClient);

  @Output() newUsuario: EventEmitter<IUsers> = new EventEmitter();
  private usuario?: IUsers;
  constructor() {}

  public PostPeople(user: IUsers, people: People): Observable<any> {
    const objPeople = { people: people, users: user };
    return this._HTTPClient.post(`${this.baseUrl}save_people`, objPeople);
  }

  public setUsuario(usuario: IUsers) {
    this.usuario = usuario;
  }
  public getUsario() {
    return this.usuario;
  }
}


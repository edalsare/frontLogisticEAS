import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { IUsers } from '../models/users.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public PostPeople(users: IUsers, people: People): Observable<HttpResponse<string>> {
    const objPeople = { people: people, users: users };
    return this._HTTPClient.post(`${this.baseUrl}save_people`, objPeople, { observe: 'response', responseType: 'text' });
  }

  public setUsuario(usuario: IUsers) {
    this.usuario = usuario;
  }
  public getUsario() {
    return this.usuario;
  }
}


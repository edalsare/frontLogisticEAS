import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsers } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/users/names';
  constructor(private _HttpClient: HttpClient) {}

  public getUsuario(name: string): Observable<IUsers> {
    return this._HttpClient.get<IUsers>(`${this.baseUrl}?name=${name}`);
  }
}

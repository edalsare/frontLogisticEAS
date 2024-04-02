import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/people/save_people';
  constructor(private _HttpClient: HttpClient) {}

  public getUsuario(): Observable<IUsers> {
    return this._HttpClient.get<IUsers>(this.baseUrl);
  }
}

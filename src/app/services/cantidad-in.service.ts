import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICantidadIn } from '../models/cantidad-in';

@Injectable({
  providedIn: 'root'
})
export class CantidadInService {

  BASE_URL: string = 'http://localhost:8000/AmountIn/';
  _HTTPClient = inject(HttpClient);

  constructor() { }

  public readByNumbill(bill: number): Observable<ICantidadIn[]>{
    return this._HTTPClient.get<ICantidadIn[]>(`${this.BASE_URL}readByNumbill?bill=${bill}`);
  }
}

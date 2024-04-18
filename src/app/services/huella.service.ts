import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IHuellaProducto } from '../models/huella';

@Injectable({
  providedIn: 'root'
})
export class HuellaService {

  private BASE_URL = "http://localhost:8000/trace/readpro";
  private _HTTPClient = inject(HttpClient);

  constructor() { }

  public readProductByTrace(): Observable<any[]>{
    return this._HTTPClient.get<any[]>(`${this.BASE_URL}`);
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IFactura } from '../models/factura';
import { IUsers } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private BASE_URL: string = 'http://localhost:8000/bill/';
  _HTTPClient = inject(HttpClient);

  constructor() { }

  public postFactura(products: any[][], bill: IFactura, users: IUsers): Observable<HttpResponse<string>>{
    const objBill = {users: users, bill: bill, products: products};
    return this._HTTPClient.post(`${this.BASE_URL}create_bill`, objBill, {observe: 'response', responseType: 'text'});
  }

  public existsByNumbill(numbill: string): Observable<Boolean>{
    return this._HTTPClient.get<Boolean>(`${this.BASE_URL}existsByNumbill?numbill=${numbill}`)
  }
}

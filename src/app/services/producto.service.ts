import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProducto } from '../models/producto';
import { Observable } from 'rxjs';
import { ICategory } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private BASE_URL: string = 'http://localhost:8000/product/';
  _HTTPClient = inject(HttpClient);

  constructor() { }

  public postProducto(idUser: number,  product: IProducto[]): Observable<HttpResponse<string>>{
    const objProduct = {idUser: idUser, product: product};
    return this._HTTPClient.post(`${this.BASE_URL}save_product`, objProduct, {observe: 'response', responseType: 'text'})
  }

  public getProductExist(idProduct: number): Observable<Boolean>{
    return this._HTTPClient.get<Boolean>(`${this.BASE_URL}readExist?idProduct=${idProduct}`);
  }
}

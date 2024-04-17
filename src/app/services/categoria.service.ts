import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICategory } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private BASE_URL: string = 'http://localhost:8000/category/';
  _HTTPClient = inject(HttpClient);

  constructor() { }

  public postCategoria(categoria: ICategory): Observable<HttpResponse<string>>{
    return this._HTTPClient.post(`${this.BASE_URL}save_category`, categoria, {observe: 'response', responseType: 'text'})
  }

  public getNameAndSubName(name: string, subnamecat: string): Observable<ICategory>{
    return this._HTTPClient.get<ICategory>(`${this.BASE_URL}readname?name=${name}&subname=${subnamecat}`)
  }

  public getAllCategorias(): Observable<string[]>{
    return this._HTTPClient.get<string[]>(`${this.BASE_URL}readAll`)
  }

  public getBynamecat(namecat: string): Observable<ICategory[]>{
    return this._HTTPClient.get<ICategory[]>(`${this.BASE_URL}readNamecat?namecat=${namecat}`)
  }
}

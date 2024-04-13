import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IMuelle } from '../models/muelle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuelleService {


  private BASE_URL: string = "http://localhost:8000/pier/";
  _HTTPClient = inject(HttpClient)

  constructor() { }

  public postMuelle(muelle: IMuelle): Observable<HttpResponse<string>>{
    return this._HTTPClient.post(`${this.BASE_URL}save_pier`, muelle, {observe: 'response', responseType: 'text'})  
  }

  public getByNameMuelle(name: string): Observable<IMuelle>{
    return this._HTTPClient.get<IMuelle>(`${this.BASE_URL}readByName?name=${name}`)
  }
}
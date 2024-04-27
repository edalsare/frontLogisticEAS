import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IHuella } from '../models/huella';
import { IPackage } from '../models/package';
import { IProporcion } from '../models/proporcion';

@Injectable({
  providedIn: 'root',
})
export class HuellaService {
  private BASE_URL = 'http://localhost:8000/trace/';
  private _HTTPClient = inject(HttpClient);

  constructor() {}

  public readProductByTrace(): Observable<any[]> {
    return this._HTTPClient.get<any[]>(`${this.BASE_URL}readpro`);
  }

  public postHuella(
    idProduct: number,
    trace: IHuella,
    packages: IPackage,
    proportion: IProporcion
  ): Observable<HttpResponse<string>> {
    const objTrace = {
      idProduct: idProduct,
      trace: trace,
      packages: packages,
      proportion: proportion,
    };
    return this._HTTPClient.post(`${this.BASE_URL}create_trece`, objTrace, {
      observe: 'response',
      responseType: 'text',
    });
  }
}

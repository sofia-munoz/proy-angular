import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insumo } from 'src/app/models/insumo/insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  urlBase: string;

  constructor(private _http: HttpClient) {
    this.urlBase = "http://localhost:3000/api/admin";
  }

  obtenerInsumos(): Observable<any> {
    return this._http.get(this.urlBase + "/insumos/");
  }
  guardarInsumo(insumo:Insumo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(insumo);
    return this._http.post(this.urlBase + "/insumo/registro", body, { headers: headers });
  }
  eliminarInsumo(id: string): Observable<any> {
    return this._http.delete( this.urlBase + "/insumo/" + id);
  }
  checkout(insumos:Array<Insumo>){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(insumos);
    return this._http.post(this.urlBase + "/insumo/checkout", body, { headers: headers });
  }
  actualizarStock(insumos: Array<any>){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(insumos);
    console.log(insumos);
    return this._http.post(this.urlBase + "/insumo/actualizar", body, { headers: headers });
  }
  obtenerInsumosSinStock(): Observable<any> {
    return this._http.get(this.urlBase + "/insumo/sin-stock");
  }
}

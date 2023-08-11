import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/models/pago/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase: string;
  constructor(private _http: HttpClient) {
    this.urlBase = "http://localhost:3000/api/pago";
  }


  public getPagos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  public getPago(id: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };

    return this._http.get(this.urlBase + "/" + id, httpOptions);
  }

  //Opciones de filtro: plan, insumo
  public getPagosFiltro(filtro: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get(this.urlBase + "/filtro/" + filtro, httpOptions);
  }

  public crearPago(pago: Pago): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(pago);
    return this._http.post(this.urlBase, body, { headers: headers });
  }
  public modificarPago(pago: Pago): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(pago);
    return this._http.put(this.urlBase + "/" + pago._id, body, { headers: headers });
  }
  public eliminarPago(id: string): Observable<any> {
    return this._http.delete(this.urlBase + id);
  }
  checkout(pago: Pago) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(pago);
    return this._http.post(this.urlBase + "/checkout/plan", body, { headers: headers });
  }
  public enviarFacturaPago(idPago: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post("http://localhost:3000/api/admin/pago/" + idPago, { headers: headers });
  }
  public getPagosFecha(fechaDesde: string, fechaHasta: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { fechaDesde: fechaDesde, fechaHasta: fechaHasta };
    console.log(body);
    return this._http.get(this.urlBase + "/fecha/"+fechaDesde+"/"+fechaHasta, { headers: headers });
  }
  public getCuotasFiltro(fechaDesde: string, fechaHasta:string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('desde', fechaDesde)
      .set('hasta', fechaHasta)

    return this._http.get(this.urlBase + "/plan/filtros", { headers: headers, params: params });
  }
  public getPlanesActivos(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.urlBase + "/plan/activo/alumno" ,  { headers: headers });
  }
}

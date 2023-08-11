import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  hostBase: string;
  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/encargado/plan";
  }

  public getPlanes(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    const body = new HttpParams()

    return this._http.get(this.hostBase);
  }
  public getPlan(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get(this.hostBase + "/" + id, httpOptions);
  }
  public crearPlan(plan: Plan): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(plan);
    return this._http.post(this.hostBase, body, { headers: headers });
  }
  public modificarPlan(plan: Plan): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(plan);
    return this._http.put(this.hostBase + "/" + plan._id, body, { headers: headers });
  }
  public getPlanesActivos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get(this.hostBase + "/filtro/activo", httpOptions);
  }
  public getHistoricoPlanes(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this._http.get("http://localhost:3000/api/encargado/planhistorico", httpOptions);
  }
  public eliminarPlan(id: string): Observable<any> {
    return this._http.delete(this.hostBase + "/" + id);
  }
}

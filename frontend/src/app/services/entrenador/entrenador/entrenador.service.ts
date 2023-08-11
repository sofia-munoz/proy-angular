import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Rutina} from "../../../models/rutina/rutina";

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  
  urlBase: string = 'http://localhost:3000/api/entrenador/';

  constructor(private _http: HttpClient) {
  }

  public obtenerEntrenador(id: any): Observable<any> {
    return this._http.get(this.urlBase + id, {});
  }

  public obtenerRutinasAsociadasAlEntrenador(id: string): Observable<any> {
    return this._http.get(this.urlBase + id + "/rutinas", {});
  }

  public getAlumnos(dni: string, plan: string, apellidos: string, nombres: string, email: string): Observable<any> {
    let params = new HttpParams();

    if (dni) {
      params = params.set('dni', dni);
    }

    if (plan) {
      params = params.set('plan', plan);
    }

    if (apellidos) {
      params = params.set('apellidos', apellidos);
    }

    if (nombres) {
      params = params.set('nombres', nombres);
    }

    if (email) {
      params = params.set('email', email);
    }
    return this._http.get('http://localhost:3000/api/alumno/', {params: params});
  }

  public agregarRutina(identrenador: any, idalumno: any, rutina: Rutina): Observable<any> {
    return this._http.put(this.urlBase + identrenador + '/alumnos/' + idalumno + '/rutina', rutina, {});
  }

  public obtenerEntrenadores(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}), params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/api/admin/entrenadores', httpOptions);
  }
}

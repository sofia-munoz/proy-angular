import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from 'src/app/models/entrenador/rutina/rutina';

@Injectable({
  providedIn: 'root'
})
export class AnadirRutinaAlumnoService {

  urlBase:string="http://localhost:3000/api";

  constructor(private _http: HttpClient) { }


  /** Obtener todos los alumnos
   * 
   * @returns lista de alumnos
   */
  getAlumnos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/admin/alumnos", httpOptions);
  }


  /** Añadir rutina a un alumno
   * 
   */
  putRutinaAlumno(idAlumno: string, idEntrenador: string, rutina: Rutina): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify(rutina);
    return this._http.put(this.urlBase + '/entrenador/' + idEntrenador + '/alumnos/' + idAlumno + '/rutina', body, httpOptions);
  }


}

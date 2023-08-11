import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, AlumnoDTO } from 'src/app/models/alumno/alumno';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlBase: string;
  constructor(private _http: HttpClient) {
    this.urlBase = "http://localhost:3000/api/user";
  }

  public createUserAlumno(alumno: AlumnoDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(alumno);
    return this._http.post(this.urlBase+'/sign-up', body, { headers: headers });
  };

  public verificarUsuario(username:string): Observable<any> {
    return this._http.get(this.urlBase + "/username/" + username);
  }
}

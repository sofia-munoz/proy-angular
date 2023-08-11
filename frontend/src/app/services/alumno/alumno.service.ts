import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Publicacion } from 'src/app/models/publicacion/publicacion';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlBase: string;

  constructor(private _http: HttpClient) {
    this.urlBase = "http://localhost:3000/api/alumno";
  }

  /**
   * TODO:
   * ● Ver asistencia: podrá visualizar los días que asistió (ASISTENCIAS)
   * ● Ver rutinas: consultar rutinas asignadas (RUTINAS)
   * ● Pago de cuotas: visualizar los pagos realizados (MIS PAGOS)
   * ● Podrá subir fotos y llevar un control de peso (PERFIL)
   * ● Modificar sus datos personales (PERFIL)
   * ● integrar los días de asistencia con el calendario de gmail (TODO)
   */
  public getAsistencias(idAlumno: any, dia: string, mes: string): Observable<any> {

    let params = new HttpParams();

    if (dia) {
      params = params.set('dia', dia);
    }

    if (mes) {
      params = params.set('mes', mes);
    }

    return this._http.get(this.urlBase + '/' + idAlumno + '/asistencias', {params: params});
  }

  public getRutinas(idAlumno: any): Observable<any> {
    return this._http.get(this.urlBase+'/'+idAlumno+'/rutinas');
  }
  public getMisPublicaciones(idAlumno: any): Observable<any> {
    return this._http.get(this.urlBase+'/'+idAlumno+'/publicaciones');
  }
  public nuevaPublicacion(idAlumno:any,publicacion:Publicacion): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(publicacion);
    return this._http.put(this.urlBase + "/" + idAlumno + "/publicacion/registrar", body, { headers: headers });
  }

  public getPagosRealizados(idAlumno: any): Observable<any> {
    // return this._http.get(this.urlBase+idAlumno+'/pagos');
    return this._http.get(this.urlBase+idAlumno+'/rutinas');
  }

  public getAlumnos(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({})
    };

    return this._http.get(this.urlBase);
  }

  public getAlumno(id: string): Observable<any> {
    return this._http.get(this.urlBase + "/" + id);
  }
  public crearAlumno(alumno: Alumno): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(alumno);
    return this._http.post(this.urlBase, body, { headers: headers });
  }

  public modificarAlumno(alumno: Alumno): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(alumno);
    return this._http.put(this.urlBase + "/" + alumno._id, body, { headers: headers });
  }
  public eliminarAlumno(id: string): Observable<any> {
    return this._http.delete("http://localhost:3000/api/admin/alumnos/" + id);
  }
  public enviarCredenciales(id: string, pass: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { pass: pass };
    return this._http.post("http://localhost:3000/api/admin/alumno/" + id, body, { headers: headers });
  }
  public verificarDni(dni:string): Observable<any> {
    return this._http.get(this.urlBase + "/dni/" + dni);
  }
  public getInscripPorMes(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.urlBase + "/ingresos/mes");
  }
  public calcularIMC(altura:any,peso:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      'X-RapidAPI-Host': 'bmi-calculator6.p.rapidapi.com',
      'X-RapidAPI-Key': 'c3195fe6f8mshf8ea4faeaf8f8bbp1766c1jsnf4c0e1cf59cc',
      })
    }
    
    return this._http.get("https://bmi-calculator6.p.rapidapi.com/bmi?height="+altura+"&weight="+peso+"&system=metric",httpOptions);
  }

}

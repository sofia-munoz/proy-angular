import {Component, OnInit} from '@angular/core';
import {AlumnoService} from "../../../services/alumno/alumno.service";
import {Alumno} from "../../../models/alumno/alumno";
import {Rutina} from "../../../models/rutina/rutina";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-alumno-asistencias',
  templateUrl: './alumno-asistencias.component.html', styleUrls: ['./alumno-asistencias.component.css']
})
export class AlumnoAsistenciasComponent implements OnInit {
  id!: any;
  alumno !: Alumno;
  rutina!: Rutina;
  rutinas: Array<Rutina> = new Array<Rutina>();
  rutinasAsignadas!: string;
  mostrarFiltrosFlag: boolean = false;

  diasSemana: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  dia!: string;
  mes!: string;

  constructor(private alumnoService: AlumnoService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.getAsistenciasDelAlumno(sessionStorage.getItem("userid"));
  }

  getAsistenciasDelAlumno(idAlumno: any) {
    this.alumnoService.getAsistencias(idAlumno, this.dia, this.mes).subscribe({
      next: result => {
        this.rutinasAsignadas = result.rutinasAsignadas;
        this.rutina = new Rutina();
        this.rutinas = new Array<Rutina>();
        result.rutinas.forEach((e: any) => {
          Object.assign(this.rutina, e);
          this.rutinas.push(this.rutina);
          this.rutina = new Rutina();
        });
      }, error: err => {
        console.log(err);
        this.toastrService.error(err.error.msg, "Error al obtener las asistencias", {positionClass: 'toast-top-right'});
      }
    });
  }

  seleccionarTodosDias() {
    this.dia = "";
    this.getAsistenciasDelAlumno(sessionStorage.getItem("userid"));
  }

  seleccionarTodosMeses() {
    this.mes = "";
    this.getAsistenciasDelAlumno(sessionStorage.getItem("userid"));
  }

  toggleSeleccionDia(dia: string) {
    this.dia = dia;
    this.getAsistenciasDelAlumno(sessionStorage.getItem("userid"));
  }

  toggleSeleccionMes(mes: string) {
    this.mes = mes;
    this.getAsistenciasDelAlumno(sessionStorage.getItem("userid"));
  }

  mostrarFiltros() {
    this.mostrarFiltrosFlag = !this.mostrarFiltrosFlag;
  }

}

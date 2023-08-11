import { Component, OnInit } from '@angular/core';
import {EntrenadorService} from "../../../services/entrenador/entrenador/entrenador.service";
import {ToastrService} from "ngx-toastr";
import {Alumno} from "../../../models/alumno/alumno";

@Component({
  selector: 'app-entrenador-rutinas',
  templateUrl: './entrenador-rutinas.component.html',
  styleUrls: ['./entrenador-rutinas.component.css']
})
export class EntrenadorRutinasComponent implements OnInit {

  planes = ["Gold","Libre","3 dias"];
  alumnos!: Array<Alumno>;
  dni!: string;
  plan!: string;
  apellidos!: string;
  nombres!: string;
  email!: string;

  constructor(
    private entrenadorService: EntrenadorService,
    private toastrService: ToastrService

  ) {
    this.alumnos = new Array<Alumno>();
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos() {
    this.entrenadorService.getAlumnos(this.dni, this.plan, this.apellidos, this.nombres, this.email).subscribe({
      next: result => {
        let alumno = new Alumno();
        this.alumnos = new Array<Alumno>();
        result.forEach((a: any) => {
          Object.assign(alumno, a);
          this.alumnos.push(alumno);
          alumno = new Alumno();
        });
      },error: err =>{
        this.toastrService.error(err.error.msg, "Error al obtener los alumnos", {positionClass: 'toast-top-right'});
      }
    });
  }

  limpiarFiltros() {
    this.dni = '';
    this.apellidos = '';
    this.nombres = '';
    this.email = '';
    this.plan = '';
    this.getAlumnos();
  }
}

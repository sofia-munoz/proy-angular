import {Component, OnInit} from '@angular/core';
import {Rutina} from "../../../models/rutina/rutina";
import {AlumnoService} from "../../../services/alumno/alumno.service";
import {ToastrService} from "ngx-toastr";
import {Ejercicio} from "../../../models/entrenador/ejercicio/ejercicio";

@Component({
  selector: 'app-alumno-rutinas',
  templateUrl: './alumno-rutinas.component.html',
  styleUrls: ['./alumno-rutinas.component.css']
})
export class AlumnoRutinasComponent implements OnInit {
  rutinas !: Array<Rutina>;
  rutinasAsignadas!: string;
  ejercicios!:Array<Ejercicio>;

  constructor(private alumnoService: AlumnoService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getRutinasDelAlumno(sessionStorage.getItem("userid"));
  }

  getRutinasDelAlumno(idAlumno: any) {
    this.alumnoService.getRutinas(idAlumno).subscribe({
      next: result => {
        console.log(result)
        this.rutinasAsignadas = result.total;
        let rutina = new Rutina();
        this.rutinas = new Array<Rutina>();
        result.rutinas.forEach((e: any) => {
          Object.assign(rutina, e);
          this.rutinas.push(rutina);
          rutina = new Rutina();
        });
      }, error: err => {
        this.toastrService.error(err.error.msg, "Error al obtener las rutinas del alumno", {positionClass: 'toast-top-right'});
      }
    });
  }

  verInformacionRutina(rutina: Rutina) {
    this.ejercicios = rutina.ejercicios;
  }
}

import {Component, OnInit} from '@angular/core';
import {AlumnoService} from "../../../services/alumno/alumno.service";
import {Alumno} from "../../../models/alumno/alumno";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-alumno-home', templateUrl: './alumno-home.component.html', styleUrls: ['./alumno-home.component.css']
})
export class AlumnoHomeComponent implements OnInit {
  id!: any;
  alumno !: Alumno;

  constructor(private alumnoService: AlumnoService,
              private router: Router,
              private toastrService: ToastrService
  ) {
    this.alumno = new Alumno();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userid");
    this.getAlumno(this.id);
  }

  getAlumno(idAlumno: any) {
    this.alumnoService.getAlumno(idAlumno).subscribe({
      next: result => {
        this.alumno = new Alumno();
        Object.assign(this.alumno, result);
      }, error: err => {
        console.log(err);
        this.toastrService.error(err.error.msg, "Error al obtener el alumno", {positionClass: 'toast-top-right'});
      }
    });
  }

  editarDatosPersonales() {
    this.router.navigate(['alumno-perfil-editar']);
  }
  controlPeso(){
    this.router.navigate(['alumno-control-peso']);
  }
}

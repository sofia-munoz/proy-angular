import {Component, OnInit} from '@angular/core';
import {Alumno} from "../../../models/alumno/alumno";
import {AlumnoService} from "../../../services/alumno/alumno.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-alumno-form-modificar',
  templateUrl: './alumno-form-modificar.component.html',
  styleUrls: ['./alumno-form-modificar.component.css'],
})
export class AlumnoFormModificarComponent implements OnInit {
  alumno!: Alumno;
  alumnoForm: FormGroup;

  constructor(private alumnoService: AlumnoService,
              private router: Router,
              private formBuilder:FormBuilder,
              private toastrService: ToastrService) {
    this.alumno = new Alumno();

    this.alumnoForm = this.formBuilder.group({
          nombre  : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z\s]+$")]),
          apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
          dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
      });
  }

  ngOnInit(): void {
    this.getAlumno(sessionStorage.getItem("userid"));
  }

  getAlumno(idAlumno: any) {
    this.alumnoService.getAlumno(idAlumno).subscribe({
      next: result => {
        this.alumno = new Alumno();
        Object.assign(this.alumno, result);
      }, error: err => {
        this.toastrService.error(err.error.msg, "Error al obtener el alumno", {positionClass: 'toast-top-right'});
      }
    });
  }

  actualizarDatosAlumno() {
    this.alumnoService.modificarAlumno(this.alumno).subscribe({
      next: result => {
        console.log(result);
        this.router.navigate(['alumno-perfil']);
        this.toastrService.success(result.msg, "Actualizacion de datos", {positionClass: 'toast-top-right'});
      },
      error: error => {
        console.log(error.error.msg);
        this.toastrService.error(error.error.msg, "Actualizacion de datos", {positionClass: 'toast-top-right'});
      }
    });
  }

}

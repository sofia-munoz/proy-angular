import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.css']
})
export class RegistroAlumnosComponent implements OnInit {

  alumnoAEliminar!:Alumno;
  alumnos!:Array<any>;
  constructor(private alumnoService:AlumnoService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.alumnoAEliminar = new Alumno();
    this.alumnos = new Array<any>();
    this.listarAlumnos();
  }
  agregarAlumno(){
    this.router.navigate(["registroAlumnos-Form",0]);
    }

  listarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      result=>{
        this.alumnos = result;
        },
      error=>{
        console.log(error);
      }
    );
  }
  modificarAlumno(alumno: Alumno){
    console.log(alumno);
    this.router.navigate(["registroAlumnos-Form",alumno._id]);
  }
  eliminarAlumno(id: string){
    this.alumnoService.eliminarAlumno(id).subscribe(
      result=>{
        this.listarAlumnos();
        this.toastrService.info(result.message, "Alumno eliminado", {positionClass: 'toast-top-right', timeOut: 1000});
        },
      error=>{
        console.log(error);
      }
    );
  }
}


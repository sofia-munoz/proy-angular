import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';

@Component({
  selector: 'app-alumno-control-peso',
  templateUrl: './alumno-control-peso.component.html',
  styleUrls: ['./alumno-control-peso.component.css']
})
export class AlumnoControlPesoComponent implements OnInit {

 altura!:string;
 IMC!:string;
 estado!:string;
 alumno:Alumno;
  constructor(private alumnoService:AlumnoService,private toastrService: ToastrService,private router:Router) { 
     this.alumno = new Alumno();
  }

  ngOnInit(): void {
      this.getAlumno(sessionStorage.getItem("userid"));
  }

  calcularIMC(){
    this.alumnoService.calcularIMC(this.altura,this.alumno.pesoActual).subscribe({
      next: result=>{
         this.IMC = result.BMI;
         this.estado = result.Class;
      },
      error: err =>{
        this.toastrService.error(err.error.msg, "Error al calcular el IMC", {positionClass: 'toast-top-right'});
      }

  });
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
  iraPerfil(){
    this.router.navigate(['alumno-perfil']);
  }
}

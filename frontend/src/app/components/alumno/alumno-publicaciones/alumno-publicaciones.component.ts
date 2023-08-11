import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Publicacion } from 'src/app/models/publicacion/publicacion';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';

@Component({
  selector: 'app-alumno-publicaciones',
  templateUrl: './alumno-publicaciones.component.html',
  styleUrls: ['./alumno-publicaciones.component.css']
})
export class AlumnoPublicacionesComponent implements OnInit {
  publicacion!:Publicacion;
  publicaciones!: Array<Publicacion>;
  totalPublicaciones!: Number;
  constructor(private alumnoService:AlumnoService,private toastrService: ToastrService) { 
    this.publicacion = new Publicacion();
  }

  ngOnInit(): void {
    this.verMisPublicaciones();
  }
  
  agregarPublicacion(){
     this.alumnoService.nuevaPublicacion(sessionStorage.getItem("userid"),this.publicacion).subscribe({
      next: result=>{
         console.log(result);
         window.location.reload();
         this.toastrService.info(result.message, "Se agrego la publicacion", {positionClass: 'toast-top-right'});
      },
      error: err =>{
        this.toastrService.error(err.error.msg, "Error al generar publicacion", {positionClass: 'toast-top-right'});

      }
    })
  }
  
  verMisPublicaciones(){
    this.alumnoService.getMisPublicaciones(sessionStorage.getItem("userid")).subscribe({
      next : result=>{
        console.log(result)
        this.totalPublicaciones = result.total;
        let publicaci = new Publicacion();
        this.publicaciones = new Array<Publicacion>();
        result.publicaciones.forEach((e: any) => {
          Object.assign(publicaci, e);
          this.publicaciones.push(publicaci);
          publicaci = new Publicacion();
        });
        this.publicaciones = this.publicaciones.reverse();
     },
     error: err=>{
      this.toastrService.error(err.error.msg, "Error al obtener publicaciones", {positionClass: 'toast-top-right'});
    }
  })
  }

}

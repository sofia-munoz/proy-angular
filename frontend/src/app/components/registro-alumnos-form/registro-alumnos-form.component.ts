import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { strict } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { Alumno, mapAlumnoToDTO } from 'src/app/models/alumno/alumno';
import { Plan } from 'src/app/models/plan/plan';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { PlanService } from 'src/app/services/plan/plan.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registro-alumnos-form',
  templateUrl: './registro-alumnos-form.component.html',
  styleUrls: ['./registro-alumnos-form.component.css']
})
export class RegistroAlumnosFormComponent implements OnInit {

  alumno: Alumno = new Alumno;
  action: String = "new";
  planes: Array<Plan> = new Array<Plan>();
  enviarCred: boolean = false;
  mostrarCampos: boolean = false;
  usuarioVerificado: boolean = false;
  usuarioConError: boolean = false;
  mostrarLoader!: boolean;
  dniVerificado: boolean = false;
  dniConError: boolean = false;

  constructor(private alumnoService: AlumnoService, private router: Router,
    private activatedRoute: ActivatedRoute, private planService: PlanService,
    private usuarioServicio: UserService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cargarPlanes();
      if (params['id'] == 0) {
        this.action = "new";
      } else {
        this.action = "update";
        this.cargarAlumno(params['id']);
      }
    });
  }

  mostrarCamposOpt() {
    this.mostrarCampos = !this.mostrarCampos;
  }

  public guardarAlumno() {
    this.usuarioServicio.createUserAlumno(mapAlumnoToDTO(this.alumno)).subscribe(
      (result: any) => {
        this.toastrService.success(result.message, "Alumno guardado", {positionClass: 'toast-top-right', timeOut: 1000});
        if (this.enviarCred) {
          let pass = this.alumno.user.password;
          this.alumnoService.enviarCredenciales(result.userId, pass).subscribe(
            result => {
              this.toastrService.info(result.message, "Credenciales enviadas", {positionClass: 'toast-top-right', timeOut: 1000});
            },
            error => {
              this.toastrService.error(error.error.error, "Error en el envío de credenciales", {positionClass: 'toast-top-right'});
            }
          );
        }
        this.router.navigate(["registroAlumnos"]);
      },
      error => {
        this.toastrService.error(error.error.error, "Error en el guardado", {positionClass: 'toast-top-right'});
      }
    );
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      result => {
        const fechaFormateada = new Date(result.fechaInscripcion).toISOString().substring(0, 10);
        result.fechaInscripcion = fechaFormateada;
        this.alumno = result;
        this.alumno.plan != null ? this.alumno.plan = this.planes.find(item => item._id === this.alumno.plan._id)! : null;
      },
      error => {
        console.log(error);
      }
    );
  }

  volverLista() {
    this.router.navigate(["registroAlumnos"]);
  }

  modificarAlumno() {
    this.alumnoService.modificarAlumno(this.alumno).subscribe(
      result => {
        this.toastrService.success(result.message, "Alumno modificado", {positionClass: 'toast-top-right', timeOut: 1000});
        this.router.navigate(["registroAlumnos"]);
      },
      error => {
        this.toastrService.error(error.error.error, "Error en la modificacion", {positionClass: 'toast-top-right'});
      }
    );
  }

  cargarPlanes() {
    this.planService.getPlanes().subscribe(
      result => {
        this.planes = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  verificarUser() {
    if (this.alumno.user.username != null) {
      this.mostrarLoader = true;
      this.usuarioServicio.verificarUsuario(this.alumno.user.username).subscribe(
        result => {
          if (result.disponible)
            this.usuarioVerificado = true;
          else
            this.usuarioConError = true;
        },
        error => {
          console.log(error);
        }
      );
      this.mostrarLoader = false;
    }

  }
  verificarDni() {
    if (this.alumno.dni != null && this.alumno.dni.length >= 8) {
      this.mostrarLoader = true;
      this.alumnoService.verificarDni(this.alumno.dni).subscribe(
        result => {
          if (result.disponible)
            this.dniVerificado = true;
          else
            this.dniConError = true;
        },
        error => {
          console.log(error);
        }
      );
      this.mostrarLoader = false;
    }

  }
}

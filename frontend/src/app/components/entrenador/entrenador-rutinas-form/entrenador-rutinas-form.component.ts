import {Component, OnInit} from '@angular/core';
import {Rutina} from "../../../models/rutina/rutina";
import {Ejercicio} from "../../../models/entrenador/ejercicio/ejercicio";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrenadorService} from "../../../services/entrenador/entrenador/entrenador.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-entrenador-rutinas-form',
  templateUrl: './entrenador-rutinas-form.component.html',
  styleUrls: ['./entrenador-rutinas-form.component.css']
})
export class EntrenadorRutinasFormComponent implements OnInit {
  alumnoId!: string;
  rutina: Rutina = new Rutina();
  ejercicioNuevo!: Ejercicio;
  ejercicioSeleccionado!: Ejercicio;
  ejercicioSeleccionadoOriginal!: Ejercicio;
  ejercicios!: Array<Ejercicio>;
  rutinas!: Array<Rutina>;
  mostrarHistorial: boolean = false;

  constructor(
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private entrenadorService: EntrenadorService,
              private toastrService: ToastrService

  ) {
    this.ejercicios = new Array<Ejercicio>();
    this.ejercicioNuevo = new Ejercicio();
    this.ejercicioSeleccionado = new Ejercicio();
    this.ejercicioSeleccionadoOriginal = new Ejercicio();
    this.rutinas = new Array<Rutina>();
  }

  ngOnInit(): void {
    this.getRutinas(sessionStorage.getItem("userid"));
    this.activatedRoute.queryParams.subscribe(params => {
      this.alumnoId = params['alumnoId'];
    });
  }

  agregarEjercicio(ejercicio: Ejercicio) {
    this.ejercicios.push(ejercicio);
    this.ejercicioNuevo = new Ejercicio();
  }

  eliminarEjercicio(ejercicio: Ejercicio) {
    const indiceDelEjercicio = this.ejercicios.indexOf(ejercicio);
    if (indiceDelEjercicio !== -1) {
      this.ejercicios.splice(indiceDelEjercicio, 1);
    }
  }

  asignarEjercicioSeleccionado(ejercicio: Ejercicio) {
    this.ejercicioSeleccionado = ejercicio;
    this.ejercicioSeleccionadoOriginal = ejercicio;
  }

  editarEjercicio(ejercicioSeleccionado: Ejercicio) {
    const indiceDelEjercicio = this.ejercicios.findIndex(ejercicio => ejercicio.nombre === ejercicioSeleccionado.nombre);
    if (indiceDelEjercicio !== -1) {
      this.ejercicios.splice(indiceDelEjercicio, 1, ejercicioSeleccionado);
    }
  }

  cancelarEdicion() {
    this.ejercicioSeleccionado = this.ejercicioSeleccionadoOriginal
  }

  asignarRutina(rutina: Rutina) {
    let idEntrenador = sessionStorage.getItem("userid");
    this.rutina.ejercicios = this.ejercicios;
    this.entrenadorService.agregarRutina(idEntrenador, this.alumnoId, rutina).subscribe({
      next: result => {
        console.log(result);
        this.toastrService.success(result.msg, "Rutinas", { positionClass: 'toast-top-right' });
        this.router.navigate(['entrenador-generar-rutina']);
      },
      error: err => {
        console.log(err);
        this.toastrService.error(err.error.msg, "Rutinas", { positionClass: 'toast-top-right' });
      }
    });
  }

  getRutinas(idEntrenador: any) {
    this.entrenadorService.obtenerRutinasAsociadasAlEntrenador(idEntrenador).subscribe({
      next: result => {
        let rutina = new Rutina();
        this.rutinas = new Array<Rutina>();
        result.rutinas.forEach((r: any) => {
          Object.assign(rutina, r);
          this.rutinas.push(rutina);
          rutina = new Rutina();
        });
      },
      error: err => {
        this.toastrService.error(err.error.msg, "Error al obtener las rutinas", {positionClass: 'toast-top-right'});
      }
    });
  }

  mostrarHistorialClick() {
    this.mostrarHistorial = !this.mostrarHistorial;
  }
}

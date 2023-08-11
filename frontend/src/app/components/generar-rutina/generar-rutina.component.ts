import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Ejercicio } from 'src/app/models/entrenador/ejercicio/ejercicio';
import { Entrenador } from 'src/app/models/entrenador/entrenador/entrenador';
import { Rutina } from 'src/app/models/entrenador/rutina/rutina';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { AnadirRutinaAlumnoService } from 'src/app/services/entrenador/anadir/anadir-rutina-alumno.service';
import { EjercicioService } from 'src/app/services/entrenador/ejercicio/ejercicio.service';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador/entrenador.service';

@Component({
  selector: 'app-generar-rutina',
  templateUrl: './generar-rutina.component.html',
  styleUrls: ['./generar-rutina.component.css']
})
export class GenerarRutinaComponent {

  rutina: Rutina;
  ejerciciosList: Array<any>;
  entrenadoresList: Array<any>;
  alumnosList: Array<Alumno>;
  ejercicioId: string = 'na';
  alumnoId: string = '';
  entrenadorId: any = sessionStorage.getItem("userid")
  ejercicio: any;
  ejer: Ejercicio = new Ejercicio();
  mostrarEjercicio: boolean = false;

  constructor(private ejercicioService: EjercicioService,
    private entrenadorService: EntrenadorService, private alumnoService: AlumnoService, 
    private anadirRutinaService: AnadirRutinaAlumnoService) {
    
    this.rutina = new Rutina();
    this.ejerciciosList = new Array<Ejercicio>();
    this.entrenadoresList = new Array<Entrenador>();
    this.alumnosList = new Array<Alumno>();
    this.ejercicio = new Ejercicio;
  }

  ngOnInit(): void {
    this.obtenerEjercicios();
    this.obtenerEntrenadores();
    this.obtenerAlumnos();
  }

  public obtenerEjercicios() {
    this.ejercicioService.getEjercicios().subscribe(
      result => {
        console.log('RESULT EJERCICIOS');
        console.log(result);
        this.ejerciciosList = result.ejercicios;
        console.log(this.ejerciciosList);
      },
      error => {
        console.log(error);
      }
    )
  }

  public obtenerEntrenadores() {
    this.entrenadorService.obtenerEntrenadores().subscribe(
      result => {
        console.log('RESULT ENTRENADORES');
        console.log(result);
        result.forEach((item: any) => {
          if (this.ejerciciosList.includes(item.nombres) == false) {
            this.entrenadoresList.push(item);
          }
        })
        console.log(this.entrenadoresList);
      },
      error => {
        console.log(error);
      }
    )
  }

  public obtenerAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      result => {
        console.log("ALUMNOS");
        console.log(result);
        this.alumnosList = result;
      },
      error => {
        console.log(error)
      }
    )
  }

  async mostrarDescEjercicio(id: string) {
    try {
      console.log(id);
      if(id == "na"){
        this.mostrarEjercicio = false;
      } else {
        this.mostrarEjercicio = true;
      }
      const result = await this.ejercicioService.getEjercicios().toPromise();
      this.ejercicio = await result.ejercicios.filter((item: any) => item._id === id);
      this.ejer = this.ejercicio[0];
      this.rutina.ejercicios = this.ejer;

    } catch (error) {
      console.log(error);
    }
  }




  public async agregarRutinaAlumno() {
    try {
      const res = this.anadirRutinaService.putRutinaAlumno(this.alumnoId, this.entrenadorId, this.rutina).subscribe(
        result => {
          console.log(result)
        },
        error => {
          console.log(error)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

import {Ejercicio} from "../entrenador/ejercicio/ejercicio";
import {Entrenador} from "../entrenador/entrenador/entrenador";

export class Rutina {
  _id!: string;
  nombre!: string;
  descripcion!: string;
  nivelDificultad!: string;
  objetivo!: string;
  tipoEntrenamiento!: string;
  entrenador!: Entrenador;
  asistencia!: string;
  fechaCreacion!: Date;
  ejercicios!: Array<Ejercicio>;
}

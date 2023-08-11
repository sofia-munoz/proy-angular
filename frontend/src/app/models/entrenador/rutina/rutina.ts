import { Ejercicio } from "../ejercicio/ejercicio";
import { Entrenador } from "../entrenador/entrenador";


export class Rutina {

   _id!:string;
   nombre!:string;           
   descripcion!:string;    
   // principiante, intermedio, avanzado
   nivelDificultad!:string; 
   // ganancia de fuerza, pérdida de peso, tonificación, etc.
   objetivo!:string;
   // entrenamiento cardiovascular, entrenamiento de fuerza, entrenamiento de flexibilidad, etc.
   tipoEntrenamiento!:string;
   fechaCreacion!:Date; //opcional
   ejercicios!:Ejercicio; //opcional
   entrenador!:Entrenador; 
   asistencia!:boolean; //opcional
}

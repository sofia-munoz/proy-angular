import { Alumno } from "../alumno/alumno";
import { Insumo } from "../insumo/insumo";
import { Plan } from "../plan/plan";

export class Pago {
    _id!:string;
    fecha:string = new Date().toISOString().substring(0, 10);;
    medioPago:string = "efectivo";
    total!:number;
    plan!:Plan;
    alumno!:Alumno;
    insumos!:Array<Insumo>;

    /**
     *
     */
    constructor() {
        this.insumos = new Array<Insumo>();
    }
}

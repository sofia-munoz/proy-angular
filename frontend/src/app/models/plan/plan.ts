export class Plan {
    _id!:string;
    nombre!:string;
    descripcion:Array<string> = new Array<string>();
    precio!:number;
    diasDisponibles!:number;
    estado!:string;
}

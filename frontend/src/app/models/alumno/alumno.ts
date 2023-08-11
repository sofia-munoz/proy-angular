import { Plan } from "../plan/plan";
import { Usuario } from "../usuario/usuario";
import {Rutina} from "../rutina/rutina";

export class Alumno {
    _id!:string;
    nombres!:string;
    apellidos!:string;
    dni!:string;
    fechaNacimiento!:string;
    celular!:string;
    domicilio!:string;
    email!:string;
    fechaInscripcion:string = new Date().toISOString().substring(0, 10);
    fotoPerfil!:string;
    pesoInicial!:number;
    pesoActual!:number;
    nivelFisico!:string;
    user!:Usuario;
    plan!:Plan;
    rutinas!:Array<Rutina>;
    publicaciones!:Array<any>;

    /**
     *
     */
    constructor() {
        this.user = new Usuario();
        this.user.rol = "ALUMNO";
    }
}

    export class AlumnoDTO {
        _id!:string;
        nombres!:string;
        apellidos!:string;
        dni!:string;
        fechaNacimiento!:string;
        celular!:string;
        domicilio!:string;
        email!:string;
        fechaInscripcion!:string;
        fotoPerfil!:string;
        pesoInicial!:number;
        pesoActual!:number;
        nivelFisico!:string;
        username!: string;
        password!: string;
        rol!: string;
        plan!:Plan;
        rutinas!:Array<any>;
        publicaciones!:Array<any>;
}

export function mapAlumnoToDTO(alumno: Alumno): AlumnoDTO {
    const alumnoDTO = new AlumnoDTO();
    alumnoDTO._id = alumno._id;
    alumnoDTO.nombres = alumno.nombres;
    alumnoDTO.apellidos = alumno.apellidos;
    alumnoDTO.dni = alumno.dni;
    alumnoDTO.fechaNacimiento = alumno.fechaNacimiento;
    alumnoDTO.celular = alumno.celular;
    alumnoDTO.domicilio = alumno.domicilio;
    alumnoDTO.email = alumno.email;
    alumnoDTO.fechaInscripcion = alumno.fechaInscripcion;
    alumnoDTO.fotoPerfil = alumno.fotoPerfil;
    alumnoDTO.pesoInicial = alumno.pesoInicial;
    alumnoDTO.pesoActual = alumno.pesoActual;
    alumnoDTO.nivelFisico = alumno.nivelFisico;
    alumnoDTO.username = alumno.user.username;
    alumnoDTO.password = alumno.user.password;
    alumnoDTO.rol = alumno.user.rol;
    alumnoDTO.plan = alumno.plan;
    alumnoDTO.rutinas = alumno.rutinas;
    alumnoDTO.publicaciones = alumno.publicaciones;

    return alumnoDTO;
}



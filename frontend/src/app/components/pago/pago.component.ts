import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Pago } from 'src/app/models/pago/pago';
import { Plan } from 'src/app/models/plan/plan';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { PagoService } from 'src/app/services/pago/pago.service';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  pago: Pago = new Pago();
  alumnos: Array<Alumno> = new Array<Alumno>();
  planes: Array<Plan> = new Array<Plan>();
  pagos: Array<Pago> = new Array<Pago>();

  constructor(private alumnoService: AlumnoService, private planService: PlanService,
    private pagoService: PagoService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarPlanes();
    this.cargarPagos();
  }
  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      result => {
        this.alumnos = result;
        this.alumnos.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
      },
      error => {
        console.log(error);
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
  cargarPagos() {
    this.pagoService.getPagosFiltro("plan").subscribe(
      result => {
        this.pagos = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  selectPrecio() {
    this.pago.total = this.pago.plan.precio;
  }
  pagarPlan() {
    this.pagoService.crearPago(this.pago).subscribe(
      result => {
        this.toastrService.success(result.message, "Pago creado", {positionClass: 'toast-top-right', timeOut: 1000});
        if (this.pago.medioPago == "efectivo" || this.pago.medioPago == "transferencia") {
          this.pagoService.enviarFacturaPago(result.idPago).subscribe(
            result => {
              location.reload()
              this.toastrService.info(result.message, "Factura enviada", {positionClass: 'toast-top-right', timeOut: 1000});
            },
            error => {
              location.reload()
              this.toastrService.error(error.error.error, "Error en el envío de factura", {positionClass: 'toast-top-right'});
            }
          );
        } else {
          this.pagoService.checkout(this.pago).subscribe(
            (result: any) => {
              console.log(result);
              const initPoint = result.init_point;
              window.open(initPoint, "_blank"); // Abre enlace en nueva pestaña
              this.pago = new Pago();
              location.reload();
            },
            error => {
              console.log(error);
            }
          );
          }
        },
        error => {
          this.toastrService.error(error.error.error, "Error en el registro del pago", {positionClass: 'toast-top-right'});
        }
    );
  }
}


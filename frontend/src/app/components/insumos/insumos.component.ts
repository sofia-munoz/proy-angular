import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Carrito } from 'src/app/models/carrito/carrito';
import { Insumo } from 'src/app/models/insumo/insumo';
import { Pago } from 'src/app/models/pago/pago';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { InsumosService } from 'src/app/services/insumo/insumos.service';
import { PagoService } from 'src/app/services/pago/pago.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  insumos: Array<Insumo> = new Array<Insumo>();
  carrito: Carrito = new Carrito;
  insumoAEliminar: Insumo = new Insumo();
  pago: Pago = new Pago();
  alumnos: Array<Alumno> = new Array<Alumno>();

  constructor(private insumosService: InsumosService, private router: Router,
    private activatedRoute: ActivatedRoute, private pagoService: PagoService,
    private alumnoService: AlumnoService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarInsumos();
    this.cargarAlumnos();
  }
  cargarInsumos() {
    this.insumosService.obtenerInsumos().subscribe(
      result => {
        this.insumos = result;
        console.log(this.insumos);
      },
      error => {
        console.log(error);
      }
    );
  }
  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      result => {
        this.alumnos = result;
        console.log(this.alumnos);
      },
      error => {
        console.log(error);
      }
    );
  }
  irFormulario() {
    this.router.navigate(["insumos-form", 0]);
  }
  agregarAlCarrito(insumo: Insumo) {
    if (this.carrito.arrayCarrito.filter(item => item._id === insumo._id).length >= insumo.cantidad) {
      this.toastrService.error("Ya no queda más stock", "Error", { positionClass: 'toast-top-right', timeOut: 1000 });
      return;
    } else {
      this.carrito.arrayCarrito.push(insumo);
      this.carrito.precioTotal += insumo.precio;
      this.carrito.cantidad++;
      this.toastrService.info("Insumo agregado al carrito", "Información", { positionClass: 'toast-top-right', timeOut: 1000 });
    }

  }
  eliminarInsumo(insumoId: string) {
    this.insumosService.eliminarInsumo(insumoId).subscribe(
      result => {
        this.cargarInsumos();
        this.toastrService.info(result.message, "Insumo eliminado", { positionClass: 'toast-top-right', timeOut: 1000 });
      },
      error => {
        this.toastrService.error(error.error.error, "Error en la eliminación", {positionClass: 'toast-top-right'});
      }
    );
  }
  pagarInsumo() {
    this.pago.total = this.carrito.precioTotal;
    this.pago.insumos = this.carrito.arrayCarrito;
    this.pagoService.crearPago(this.pago).subscribe(
      result => {
        this.toastrService.success(result.message, "Pago guardado", {positionClass: 'toast-top-right', timeOut: 1000});
        this.actualizarCantidad();
        if (this.pago.medioPago == "efectivo" || this.pago.medioPago == "transferencia" ) {
          if (this.pago.alumno != null) {
            this.pagoService.enviarFacturaPago(result.idPago).subscribe(
              result => {
                this.toastrService.info(result.message, "Factura enviada", {positionClass: 'toast-top-right', timeOut: 1000});
                location.reload();
              },
              error => {
                this.toastrService.error(error.error.error, "Error en el envío de factura", {positionClass: 'toast-top-right'});
              }
            );
          }else{
            location.reload();
          }
        } else {
          this.checkout();
        }
      },
      error => {
        this.toastrService.error(error.error.error, "Error en el registro del pago", {positionClass: 'toast-top-right'});
      }
    );

  }

  checkout() {
    this.insumosService.checkout(this.carrito.arrayCarrito).subscribe(
      (result: any) => {
        const initPoint = result.init_point;
        window.open(initPoint, "_blank"); // Abre enlace en nueva pestaña
        this.router.navigate(["insumos"]);
        this.cargarInsumos();
        this.carrito = new Carrito();
        location.reload();
      },
      error => {
        this.toastrService.error(error.error.error, "Error en mercadopago", {positionClass: 'toast-top-right'});
      }
    );
  }
  actualizarCantidad() {
    const nuevoArrayCarrito = this.carrito.arrayCarrito.reduce((resultado: any[], insumo: any) => {
      const existente = resultado.find((item: any) => item._id === insumo._id);
      if (existente) {
        existente.cantidad++;
      } else {
        resultado.push({ _id: insumo._id, cantidad: 1 });
      }
      return resultado;
    }, []);

    this.insumosService.actualizarStock(nuevoArrayCarrito).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
  irTotalVentas() {
    this.router.navigate(["insumos-ventas"]);
  }
  eliminarDelCarrito(index: number) {
    let eliminado = this.carrito.arrayCarrito.splice(index, 1);
    this.carrito.cantidad--;
    this.carrito.precioTotal -= eliminado[0].precio;
  }
}  

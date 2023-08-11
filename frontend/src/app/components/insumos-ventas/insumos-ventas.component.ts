import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/models/pago/pago';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-insumos-ventas',
  templateUrl: './insumos-ventas.component.html',
  styleUrls: ['./insumos-ventas.component.css']
})
export class InsumosVentasComponent implements OnInit {

  pagos: Array<Pago> = new Array<Pago>();
  constructor(private pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPagos();
  }
  cargarPagos() {
    this.pagoService.getPagosFiltro("insumo").subscribe(
      result => {
        this.pagos = result;
        console.log(this.pagos);
      },
      error => {
        console.log(error);
      }
    );
  }
  volverInsumos(){
    this.router.navigate(["insumos"]);
  }
}

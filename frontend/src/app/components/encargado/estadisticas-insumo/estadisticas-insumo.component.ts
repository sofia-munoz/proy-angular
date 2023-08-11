import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { max } from 'rxjs';
import { Insumo } from 'src/app/models/insumo/insumo';
import { Pago } from 'src/app/models/pago/pago';
import { InsumosService } from 'src/app/services/insumo/insumos.service';
import { PagoService } from 'src/app/services/pago/pago.service';
declare var google: any;

@Component({
  selector: 'app-estadisticas-insumo',
  templateUrl: './estadisticas-insumo.component.html',
  styleUrls: ['./estadisticas-insumo.component.css']
})
export class EstadisticasInsumoComponent implements OnInit {

  pagosInsumos: Array<Pago> = new Array<Pago>();
  insumosSinStock: Array<Insumo> = new Array<Insumo>();
  fechaDesde!: string;
  fechaHasta!: string;
  fechaHoy!: string;
  insumoMasVendido!: any;
  datosGC!: any;

  constructor(private router: Router, private pagoService: PagoService, private insumoService: InsumosService) { }

  ngOnInit(): void {
    this.cargarPagos();
    this.cargarInsumosSinStock();
    google.charts.load('current', { 'packages': ['corechart'] });
    //google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart = () => {
    // Set Data
    const data = google.visualization.arrayToDataTable(this.datosGC);

    // Set Options
    const options = {
      title: 'Histórico de Ventas de Insumos'
    };

    // Draw
    const chart = new google.visualization.BarChart(document.getElementById('chart_insumos'));
    chart.draw(data, options);
  }

  cargarPagos() {
    this.pagoService.getPagosFiltro("insumo").subscribe(
      result => {
        this.pagosInsumos = result;
        this.getDatosEstadisticos()
      },
      error => {
        console.log(error);
      }
    );
  }
  /*
  limpiarFiltros() {
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.cargarPagos();
  }
  filtrar() {

 */
  getDatosEstadisticos() {
    // Crear el objeto contador
    const contadorInsumos = new Map<string, number>();

    // Recorrer el array de pagos
    for (const pago of this.pagosInsumos) {
      // Recorrer los insumos de cada pago
      for (const insumo of pago.insumos) {
        // Verificar si el insumo ya existe en el contador
        if (contadorInsumos.has(insumo._id)) {
          // Incrementar el contador en 1
          const contadorActual = contadorInsumos.get(insumo._id);
          contadorInsumos.set(insumo._id, contadorActual! + 1);
        } else {
          // Agregar el insumo al contador con valor inicial de 1
          contadorInsumos.set(insumo._id, 1);
        }
      }
    }

    // Encontrar el insumo con la mayor cantidad de ventas
    let insumoMasVendidoId = '';
    let maxVentas = 0;

    for (const [insumoId, ventas] of contadorInsumos.entries()) {
      if (ventas > maxVentas) {
        maxVentas = ventas;
        insumoMasVendidoId = insumoId;
      }
    }

    // Obtener el objeto del insumo más vendido
    const insumoMasVendido = this.pagosInsumos
      .flatMap(pago => pago.insumos)
      .find(insumo => insumo._id === insumoMasVendidoId);

    this.insumoMasVendido = [insumoMasVendido, maxVentas];

    const data: (string | number | { role: string })[][] = [
      ['Insumos', 'Ventas', { role: 'style' }]
    ];

    for (const [insumoId, ventas] of contadorInsumos.entries()) {
      const insumo = this.pagosInsumos
        .flatMap(pago => pago.insumos)
        .find(insumo => insumo._id === insumoId);

      if (insumo) {
        const fila: (string | number | { role: string })[] = [
          insumo.nombre, // Nombre del insumo
          ventas, // Convert ventas to a string
          ''             // Estilo visual (vacío por ahora, se puede personalizar)
        ];
        data.push(fila);
      }
    }

    this.datosGC = data;
    google.charts.setOnLoadCallback(this.drawChart.bind(this));

  }

  calcularTotalRecaudado() {
    return this.pagosInsumos.reduce((acumulador, pago) => acumulador + pago.total, 0);
  }
  cargarInsumosSinStock(){
    this.insumoService.obtenerInsumosSinStock().subscribe(
      result => {
        this.insumosSinStock = result;
        console.log(this.insumosSinStock)
      },
      error => {
        console.log(error);
      }
    );
  }
}


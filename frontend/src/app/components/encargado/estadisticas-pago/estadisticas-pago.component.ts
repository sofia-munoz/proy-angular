import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/models/pago/pago';
import { PagoService } from 'src/app/services/pago/pago.service';
declare var google: any;

@Component({
  selector: 'app-estadisticas-pago',
  templateUrl: './estadisticas-pago.component.html',
  styleUrls: ['./estadisticas-pago.component.css']
})
export class EstadisticasPagoComponent implements OnInit {

  pagos: Array<Pago> = new Array<Pago>();
  fechaDesde!: string;
  fechaHasta!: string;
  fechaHoy!: string;
  distribucion!: any;
  recaudadoInsumos!: number;
  recaudadoPlanes!: number;

  constructor(private pagoService: PagoService, private router: Router) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.fechaHoy = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.cargarPagos();
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
    google.charts.setOnLoadCallback(this.drawChart2.bind(this));
  }

  drawChart = () => {
    // Create the data table.
    let datos = this.cargarDatosGC();
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'MedioPago');
    data.addColumn('number', 'Cantidad');
    data.addRows(datos);

    // Set chart options
    var options = {
      'title': 'Tipos de pago',
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
  drawChart2() {
    var data = google.visualization.arrayToDataTable([
      ['TipoIngreso', 'Total'],
      ['Planes', this.recaudadoPlanes],
      ['Insumos', this.recaudadoInsumos]
    ]);

    var options = {
      title: 'Tipo de ingresos',
      pieHole: 0.4,
      'width': 400,
      'height': 300
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }
  cargarDatosGC() {
    let listaListas = [];
    for (let i = 0; i < this.distribucion.length; i++) {
      let diccionario = this.distribucion[i];
      let valores = Object.values(diccionario);
      listaListas.push(valores);
    }

    return listaListas;
  }

  cargarPagos() {
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = result;
        this.distribucion = this.calcularDistribucion();
        this.calcularIngresosPorTipo();
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
        google.charts.setOnLoadCallback(this.drawChart2.bind(this));
      },
      error => {
        console.log(error);
      }
    );
  }
  limpiarFiltros() {
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.cargarPagos();
  }
  filtrarPorFecha() {
    this.pagoService.getPagosFecha(this.fechaDesde, this.fechaHasta).subscribe(
      result => {
        this.pagos = result;
        this.distribucion = this.calcularDistribucion();
        this.calcularIngresosPorTipo();
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
        google.charts.setOnLoadCallback(this.drawChart2.bind(this));
      },
      error => {
        console.log(error);
      }
    );
  }
  calcularTotalRecaudado() {
    return this.pagos.reduce((acumulador, pago) => acumulador + pago.total, 0);
  }
  calcularDistribucion() {
    const conteoPorTipoPago: { [key: string]: number } = this.pagos.reduce((acumulador, pago) => {
      if (acumulador[pago.medioPago]) {
        acumulador[pago.medioPago]++;
      } else {
        acumulador[pago.medioPago] = 1;
      }
      return acumulador;
    }, {} as { [key: string]: number });
    const arrayResultado = Object.entries(conteoPorTipoPago).map(([tipo, cantidad]) => ({ tipo, cantidad }));

    return arrayResultado;
  }
  calcularPromedio() {
    const montoTotal = this.pagos.reduce((acumulador, pago) => acumulador + pago.total, 0);
    const montoPromedio = montoTotal / this.pagos.length;
    return montoPromedio;
  }
  calcularIngresosPorTipo() {
    var insumos;
    var planes;
    
    insumos = this.pagos.filter((pago: any) => pago.plan == null);
    this.recaudadoInsumos = insumos.reduce((acumulador: any, pago: any) => acumulador + pago.total, 0);
    planes = this.pagos.filter((pago: any) => pago.plan != null);
    this.recaudadoPlanes = planes.reduce((acumulador: any, pago: any) => acumulador + pago.total, 0);
    console.log(insumos)
    console.log(planes)
    console.log(this.recaudadoInsumos)
    console.log(this.recaudadoPlanes)
  }
}
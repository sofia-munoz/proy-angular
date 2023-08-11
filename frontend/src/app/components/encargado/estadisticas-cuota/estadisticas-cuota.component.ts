import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/models/pago/pago';
import { PagoService } from 'src/app/services/pago/pago.service';
declare var google: any;

@Component({
  selector: 'app-estadisticas-cuota',
  templateUrl: './estadisticas-cuota.component.html',
  styleUrls: ['./estadisticas-cuota.component.css']
})
export class EstadisticasCuotaComponent implements OnInit {

  pagosPlanes: Array<Pago> = new Array<Pago>();
  histPlanes: Array<Pago> = new Array<Pago>();
  fechaDesde!: string;
  fechaHasta!: string;
  fechaHoy!: string;
  nombreABuscar!: string;
  activos!: boolean;
  totalRecaudado!: number;
  distribucion!: any;

  constructor(private router: Router, private pagoService: PagoService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.fechaHoy = `${year}-${month}-${day}`;
  }


  ngOnInit(): void {
    this.cargarPagos();
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.dibujarGraficoTorta.bind(this));
    google.charts.setOnLoadCallback(this.dibujarGraficoBarras.bind(this));
  }
  dibujarGraficoTorta = () => {
    // Create the data table.
    let datos = this.cargarDatosGrafTorta();
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
  dibujarGraficoBarras() {
    // Create the data table.
    // Define the chart to be drawn.
    var datos = this.cargarDatosGrafBarras();
    console.log(datos);
    var data = google.visualization.arrayToDataTable(datos);

    var options = { title: 'Cantidad de planes vedidos' };

    // Instantiate and draw the chart.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_colums'));
    chart.draw(data, options);
  }

  cargarDatosGrafTorta() {
    let listaListas = [];
    for (let i = 0; i < this.distribucion.length; i++) {
      let diccionario = this.distribucion[i];
      let valores = Object.values(diccionario);
      listaListas.push(valores);
    }

    return listaListas;
  }
  cargarDatosGrafBarras() {
    // Objeto para almacenar la cantidad de registros por plan
    const cantidadPorPlan:any = {};

    // Contar la cantidad de registros por plan
    for (const pago of this.pagosPlanes) {
      const plan = pago.plan.nombre;
      if (cantidadPorPlan[plan]) {
        cantidadPorPlan[plan]++;
      } else {
        cantidadPorPlan[plan] = 1;
      }
    }

    // Convertir los datos en un array para Google Charts
    const data = [];
    data.push(['Planes', 'Cantidad']);
    for (const plan in cantidadPorPlan) {
      const cantidad = cantidadPorPlan[plan];
      data.push([plan, cantidad]);
    }

    return data;
  }

  cargarPagos() {
    this.pagoService.getPagosFiltro("plan").subscribe(
      result => {
        this.pagosPlanes = result;
        this.histPlanes = result;
        this.calcularTotalRecaudado()
        this.distribucion = this.calcularDistribucion();
        google.charts.setOnLoadCallback(this.dibujarGraficoTorta.bind(this));
        google.charts.setOnLoadCallback(this.dibujarGraficoBarras.bind(this));
      },
      error => {
        console.log(error);
      }
    );
  }
  limpiarFiltros() {
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.nombreABuscar = "";
    this.activos = false;
    this.cargarPagos();
  }
  filtrar() {
    if (this.activos) {
      this.pagoService.getPlanesActivos().subscribe(
        (result: any) => {
          this.pagosPlanes = result;
          this.distribucion = this.calcularDistribucion();
          google.charts.setOnLoadCallback(this.dibujarGraficoTorta.bind(this));
          google.charts.setOnLoadCallback(this.dibujarGraficoBarras.bind(this));
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.pagoService.getCuotasFiltro(this.fechaDesde, this.fechaHasta).subscribe(
        (result: any) => {
          this.pagosPlanes = result;
          this.distribucion = this.calcularDistribucion();
          google.charts.setOnLoadCallback(this.dibujarGraficoTorta.bind(this));
          google.charts.setOnLoadCallback(this.dibujarGraficoBarras.bind(this));
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  calcularTotalRecaudado() {
    return this.pagosPlanes.reduce((acumulador, pago) => acumulador + pago.total, 0);
  }
  calcularPromedio() {
    const montoTotal = this.pagosPlanes.reduce((acumulador, pago) => acumulador + pago.total, 0);
    const montoPromedio = montoTotal / this.pagosPlanes.length;
    return montoPromedio;
  }
  calcularDistribucion() {
    const conteoPorTipoPago: { [key: string]: number } = this.pagosPlanes.reduce((acumulador, pago) => {
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
}

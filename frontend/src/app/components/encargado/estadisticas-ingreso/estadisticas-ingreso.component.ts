import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
declare var google: any;

@Component({
  selector: 'app-estadisticas-ingreso',
  templateUrl: './estadisticas-ingreso.component.html',
  styleUrls: ['./estadisticas-ingreso.component.css']
})
export class EstadisticasIngresoComponent implements OnInit {

  datos:Array<any>=new Array<any>();
  mostrarLoader!: boolean;

  constructor(private router: Router, private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    this.cargarDatosGC();
    
  }
  ngAfterViewInit(): void {
    // Llama a drawChart cuando la vista haya sido inicializada y el contenedor esté presente
    google.charts.setOnLoadCallback(() => {
      this.drawChart();
  
      // Registra un observador de cambios de tamaño de la ventana
      window.addEventListener('resize', () => {
        this.drawChart();
      });
    });
  }
  
  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.datos);
    var options = {
      title: 'Ingresos por mes del año actual',
      curveType: 'none',
      legend: { position: 'bottom' }
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('chart_ingresos'));
  
    // Ajusta el tamaño del gráfico al tamaño del contenedor
    chart.draw(data, options);
  }
  cargarDatosGC() {
    this.mostrarLoader = true;
    this.alumnoService.getInscripPorMes().subscribe(
      result => {
        const data = result.map(({ mesNombre, alumnosInscritos }: { mesNombre: string, alumnosInscritos: number }) => [mesNombre, alumnosInscritos]);
        // Agregar las filas correspondientes a los meses que faltan
        for (let mes = 1; mes <= 12; mes++) {
          const mesEncontrado = result.find(({ mes } : {mes: number}) => mes === mes);
          if (!mesEncontrado) {
            const nombreMes = new Date(0, mes - 1).toLocaleString('default', { month: 'long' });
            data.push([nombreMes, 0]);
          }
        }

        data.unshift(['Meses', 'Ingresos']);
        this.datos=data;
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
        this.mostrarLoader = false;
      },
      error => {
        console.log(error)
      }
    );
  }
}

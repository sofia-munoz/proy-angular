import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { HistoricoPlanes } from 'src/app/models/historico/historico-planes';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';
declare var google: any;

@Component({
  selector: 'app-balance-plan-historico',
  templateUrl: './balance-plan-historico.component.html',
  styleUrls: ['./balance-plan-historico.component.css']
})
export class BalancePlanHistoricoComponent implements OnInit {

  historico: Array<HistoricoPlanes> = new Array<HistoricoPlanes>();
  planes: Array<Plan> = new Array<Plan>();
  planSeleccionado: Plan = new Plan();

  constructor(private router: Router, private planService: PlanService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarHistorico();
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
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
  volverPlanes() {
    this.router.navigate(["balancePlanes"]);
  }
  cargarHistorico() {
    console.log(this.planSeleccionado)
    this.planService.getHistoricoPlanes().subscribe(
      result => {
        this.historico = result;
        result.forEach((element: any) => {
          if (!this.planes.find((p: any) => p._id === element.plan._id)) {
            this.planes.push(element.plan);
          }
        });
        this.planSeleccionado = this.planes[0];
        google.charts.setOnLoadCallback(this.drawChart);
      },
      error => {
        this.toastrService.error(error.error.error, "Error cargando el histórico", { positionClass: 'toast-top-right' })
      }
    );
  }

  drawChart = () => {
    // Set Data
    const data = this.cargarDatosGrafico();
    // Set Options
    const options = {
      title: 'Precio de plan ' + this.planSeleccionado.nombre + ' en el tiempo',
      hAxis: { title: 'Tiempo' },
      vAxis: { title: 'Precio en ARS' },
      legend: 'none'
    };
    // Draw Chart
    const chart = new google.visualization.LineChart(document.getElementById('chart_hplanes'));
    chart.draw(data, options);
  }

  cargarDatosGrafico() {
    const data = [['Fecha', 'Precio']];
    const result = this.historico.filter((element: any) => element.plan._id === this.planSeleccionado._id);

    result.forEach((element: any) => {
      const fecha = new Date(element.fechaModificacion).toLocaleString(); // Ajusta el formato de la fecha según tus necesidades
      const precio = element.nuevoPrecio;
      data.push([fecha, precio]);
    });

    return google.visualization.arrayToDataTable(data);

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irPagos(){
    this.router.navigate(["estadisticas-pago"]);
  }
  irIngresos(){
    this.router.navigate(["estadisticas-ingreso"]);
  }
  irAsistencias(){
    this.router.navigate(["estadisticas-asistencia"]);
  }
  irCuotas(){
    this.router.navigate(["estadisticas-cuota"]);
  }
  irInsumos(){
    this.router.navigate(["estadisticas-insumo"]);
  }
}

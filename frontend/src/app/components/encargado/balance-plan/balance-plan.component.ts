import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-balance-plan',
  templateUrl: './balance-plan.component.html',
  styleUrls: ['./balance-plan.component.css']
})
export class BalancePlanComponent implements OnInit {

  planes: Array<Plan> = new Array<Plan>();
  activos: boolean = false;
  planAEliminar:Plan = new Plan();

  constructor(private planService: PlanService, private router: Router, private activatedRoute: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarPlanes();
  }
  cargarPlanes() {
    this.planService.getPlanes().subscribe(
      result => {
        this.planes = result;
      },
      error => {
        this.toastrService.error(error.error.error, "Error al cargar los pagos", {positionClass: 'toast-top-right'});
      }
    )
  }
  filtrarPlanes() {
    if (this.activos) {
      this.planService.getPlanesActivos().subscribe(
        result => {
          this.planes = result;
        },
        error => {
          this.toastrService.error(error.error.error, "Error en el filtro de pagos", {positionClass: 'toast-top-right'});
        }
      )
    } else {
      this.cargarPlanes();
    }
  }
  agregarPlan(){
    this.router.navigate(["balancePlanes-form/", 0]);
  }
  modificarPlan(plan: Plan){
    this.router.navigate(["balancePlanes-form",plan._id]);
  }
  eliminarPlan(id:string){
    this.planService.eliminarPlan(id).subscribe(
      result=>{
        this.cargarPlanes();
        this.toastrService.info(result.message, "Plan eliminado", {positionClass: 'toast-top-right', timeOut: 1000});
        },
      error=>{
        this.toastrService.error(error.error.error, "Error en la eliminación del plan", {positionClass: 'toast-top-right'});
      }
    );
  }
  irHistorico(){
    this.router.navigate(["balancePlanes-historico"]);
  }
}

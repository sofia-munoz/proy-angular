import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-balance-plan-form',
  templateUrl: './balance-plan-form.component.html',
  styleUrls: ['./balance-plan-form.component.css']
})
export class BalancePlanFormComponent implements OnInit {

  plan:Plan = new Plan();
  action: String = "new";
  activo:boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private planService: PlanService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == 0) {
        this.action = "new";
      } else {
        this.action = "update";
        this.cargarPlan(params['id']);
      }
    });
  }
  cargarPlan(id: string){
    this.planService.getPlan(id).subscribe(
      result => {
        this.plan = result;
        this.activo = this.plan.estado == "A" ? true : false;
      },
      error => {
        this.toastrService.error(error.error.error, "Error cargando el plan", {positionClass: 'toast-top-right'})
      }
    );
  }
  guardarPlan(){
    this.plan.estado = this.activo ? "A" : "I";
    this.planService.crearPlan(this.plan).subscribe(
      result=>{
        this.router.navigate(["balancePlanes"]);
        this.toastrService.success(result.message, "Plan guardado", {positionClass: 'toast-top-right', timeOut: 1000});
      },
      error=>{
        this.toastrService.error(error.error.error, "Error en el guardado del plan", {positionClass: 'toast-top-right'})
      }
    );
  }
  modificarPlan(){
    this.plan.estado = this.activo ? "A" : "I";
    this.planService.modificarPlan(this.plan).subscribe(
      result => {
        this.toastrService.success(result.message, "Plan modificado", {positionClass: 'toast-top-right', timeOut: 1000});
        this.router.navigate(["balancePlanes"]);
      },
      error => {
        this.toastrService.error(error.error.error, "Error en la modificacion", {positionClass: 'toast-top-right'});
      }
    );
  }
  volverLista(){
    this.router.navigate(["balancePlanes"]);
  }
  cambiarActivo(checked: boolean) {
    this.activo = checked;
  }
  
}

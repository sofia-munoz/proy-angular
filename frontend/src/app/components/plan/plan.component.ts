import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  plan!:Plan;
  planes:Array<Plan> = new Array<Plan>();
  constructor(private planService: PlanService) { }

  ngOnInit(): void {
    this.getPlanes();
  }

  getPlanes(){
    this.planService.getPlanes().subscribe(
      result=>{
        result.forEach((p: any) => {
          this.plan = new Plan();
          this.plan._id = p._id;
          this.plan.nombre = p.nombre;
          this.plan.precio = p.precio;
          this.plan.descripcion = p.descripcion.split(".").filter((i:any) => i != "");
          this.planes.push(this.plan);
        });
        this.planes.sort(( a, b ) => { return a.precio - b.precio });
      },
      error=>{

      }
    );
  }

}

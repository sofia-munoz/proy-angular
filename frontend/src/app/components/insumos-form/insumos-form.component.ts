import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Insumo } from 'src/app/models/insumo/insumo';
import { InsumosService } from 'src/app/services/insumo/insumos.service';

@Component({
  selector: 'app-insumos-form',
  templateUrl: './insumos-form.component.html',
  styleUrls: ['./insumos-form.component.css']
})
export class InsumosFormComponent implements OnInit {

  insumo:Insumo = new Insumo();
  action: String = "new";
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private insumoService:InsumosService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == 0) {
        this.action = "new";
      } else {
        this.action = "update";
        this.cargarInsumo(params['id']);
      }
    });
  }
  cargarInsumo(id: string){

  }
  guardarInsumo(){
    this.insumoService.guardarInsumo(this.insumo).subscribe(
      result=>{
        this.router.navigate(["insumos"]);
        this.toastrService.success(result.message, "Insumo guardado", {positionClass: 'toast-top-right', timeOut: 1000});
      },
      error=>{
        this.toastrService.error(error.error.error, "Error en el guardado del insumo", {positionClass: 'toast-top-right'})
      }
    );
  }
  modificarInsumo(){

  }
  volverLista(){
    this.router.navigate(["insumos"]);
  }
}

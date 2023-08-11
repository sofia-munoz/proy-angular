import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pago } from 'src/app/models/pago/pago';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-alumno-pago-cuotas',
  templateUrl: './alumno-pago-cuotas.component.html',
  styleUrls: ['./alumno-pago-cuotas.component.css']
})
export class AlumnoPagoCuotasComponent implements OnInit {
pago!:Pago;
pagos!: Array<Pago>

  constructor(private pagoService:PagoService, private toastrService: ToastrService) { 
    this.pagosdeAlumno();
  }

  ngOnInit(): void {
  }


  pagosdeAlumno(){
      this.pagoService.getPagosFiltro('plan').subscribe({
        next: result =>{
        let pag = new Pago();
        this.pagos = new Array<Pago>();
        result.forEach((e: any) => {
          Object.assign(pag, e);
          this.pagos.push(pag);
          pag = new Pago();
        });
         this.pagos = this.pagos.filter(p=>p.alumno._id == sessionStorage.getItem("userid")); 
       },
        error: err =>{
          this.toastrService.error(err.error.msg, "Error al obtener pagos", {positionClass: 'toast-top-right'});
        }
      })
  }

}

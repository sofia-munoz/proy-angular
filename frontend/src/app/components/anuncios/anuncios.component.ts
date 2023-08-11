import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnunciosService } from 'src/app/services/anuncio/anuncios.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  message!:string;
  imagenUrl!:string;
  anuncios:Array<any> = new Array<any>();
  mostrarLoader!: boolean;
  
  constructor(private anunciosService: AnunciosService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  publicar(){
    this.mostrarLoader = true;
    this.anunciosService.postearAnuncioFB(this.message).subscribe(
      result => {
        location.reload();
        this.mostrarLoader = false;
        this.toastrService.success(result.message, "Publicación enviada", {positionClass: 'toast-top-right', timeOut: 1000});
      },
      error => {
        this.toastrService.error(error.error.error, "Error en el envío de la publicación", {positionClass: 'toast-top-right'});
      }
    );
  }
  publicarConImg(){
    this.mostrarLoader = true;
    this.anunciosService.postearAnuncioImgFB(this.message, this.imagenUrl).subscribe(
      result => {
        this.cargarAnuncios;
        this.mostrarLoader = false;
        this.toastrService.success(result.message, "Publicación enviada", {positionClass: 'toast-top-right', timeOut: 1000}); 
      },
      error => {
        this.toastrService.error(error.error.error, "Error en el envío de la publicación", {positionClass: 'toast-top-right'});
      }
    );
  }

  cargarAnuncios(){
    this.anunciosService.getAnunciosFB().subscribe(
      result => {
        this.anuncios = result.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}

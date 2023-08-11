import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from "@angular/forms";


function verificarSoloNumeros(c: AbstractControl) {
  // si el control no ha sido usado, retorno null
  if (c.value == null) return null;

  // si se ha ingresado algo que no sea un número, retorno un error
  if (!/^[0-9]*$/.test(c.value)) {
    return { soloNumeros: true };
  }

  // en cualquier otro caso, retorno null (sin error)
  return null;
}
@Directive({
  selector: '[solo-numeros]',
  providers: [{
    provide: NG_VALIDATORS, multi: true, useValue: verificarSoloNumeros
  }]
})
export class ValidacionNumerosDirective {

  constructor() { }

}

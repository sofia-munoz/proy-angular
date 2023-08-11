import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS} from '@angular/forms';


function verificarCaracterEspecial(c: AbstractControl) {
  // si el control no ha sido usado retorno null
  if (c.value == null) return null;

  // si se ha ingresado un caracter especial en el atributo la funcion retornara true
  if (!/^[a-zA-Z0-9 ]*$/.test(c.value)) {
    // retorno un error mediante un objeto con un atributo booleado,
    // este atributo será parte del array de errors asociado al control.
    return {caracterEspecial: true};
  }
  // en cualquier otro caso retorno null (sin error)
  return null;
}

@Directive({
  // Este selector será usado en el la vista html como un atributo más de un elemento
  selector: '[caracter-especial]',
  providers: [{
    provide: NG_VALIDATORS, multi: true, useValue: verificarCaracterEspecial
  }]
})
export class ValidacionCaracteresDirective {

  constructor() {
  }

}

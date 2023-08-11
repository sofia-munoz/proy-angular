import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from "@angular/forms";


export function validarSoloLetras(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    const soloLetrasRegex = /^[a-zA-Z\s]*$/; // Expresión regular para validar solo letras

    if (valor && !soloLetrasRegex.test(valor)) {
      return { soloLetras: true };
    }

    return null;
  };
}
@Directive({
  selector: '[solo-letras]',
  providers: [{
    provide: NG_VALIDATORS, multi: true, useValue: validarSoloLetras
  }]
})
export class ValidacionLetrasDirective {

  constructor() { }

}

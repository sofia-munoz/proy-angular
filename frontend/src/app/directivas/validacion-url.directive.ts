import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from "@angular/forms";


function urlFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '') {
      return null;  // Si el campo está vacío, se considera válido
    }

    // Verificar si el valor es una URL válida utilizando una expresión regular
    const urlPattern = /^(http(s)?:\/\/)?\S+\.(jpeg|jpg|png|gif)$/i;
    if (!urlPattern.test(control.value)) {
      return { urlFormat: true };  // Retornar error si no es una URL válida
    }

    return null;  // Retornar null si la validación pasa correctamente
  };
}

@Directive({
  selector: '[url-format]',
  providers: [{
    provide: NG_VALIDATORS, multi: true, useValue: urlFormatValidator
  }]
})
export class ValidacionUrlDirective {

  constructor() { }

}

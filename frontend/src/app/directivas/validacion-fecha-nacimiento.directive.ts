import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from "@angular/forms";

function validarFechaNacimiento(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();

    if (fechaNacimiento.getTime() > fechaActual.getTime()) {
      return { fechaInvalida: true };
    }

    return null;
  };
}
@Directive({
  selector: '[fecha-nacimiento]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidacionFechaNacimientoDirective,
      multi: true
    }
  ]
})
export class ValidacionFechaNacimientoDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    return validarFechaNacimiento()(control);
  }
}

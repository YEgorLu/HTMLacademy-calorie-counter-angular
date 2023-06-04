import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNumber = (typeof control.value === 'number') || (!Number.isNaN(+control.value));
    return isNumber ?
      null :
      {isNotNumber: {value: control.value}}
  }
}

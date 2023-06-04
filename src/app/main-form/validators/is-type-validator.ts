import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Sex} from "@app/sex";
import {Activity} from "@app/activity";


export function isTypeValidator<T>(checkFn: (value: any) => value is T): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const correctType = checkFn(control.value);
    return correctType ?
      null :
      {typeError: {value: `${control.value} has incorrect type`}}
  }
}

function isValueInEnum<T extends object>(_enum: T, value: any): value is T {
  return Object.values(_enum).includes(value);
}

export function isSexValidator(): ValidatorFn {
  const validator = (value: any): value is Sex => isValueInEnum(Sex, value);
  return isTypeValidator<Sex>(validator);
}

export function isActivityValidator(): ValidatorFn {
  const validator = (value: any): value is Activity => isValueInEnum(Activity, value);
  return isTypeValidator<Activity>(validator);
}

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appSamevalidator]',
  standalone: true,
  providers: [
    {provide: NG_VALIDATORS, useExisting: SameValueValidatorDirective, multi: true},
  ],
})
export class SameValueValidatorDirective implements Validators {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return samevalueValidator(control);
  }
}


/** An actor's name can't match the given regular expression */
export function samevalueValidator(control: AbstractControl,): ValidationErrors | null{
  
    const password=control.get('password')?.value;
    const confirm=control.get('confirm')?.value;
    const same = password===confirm;
    return !same ? {forbiddenName: {value: control.value}} : null;
}


export function ShouldIncludeMoreCaracterValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value.password);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

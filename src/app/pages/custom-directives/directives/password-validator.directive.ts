import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Directive({
  standalone:true,
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  @Input('appPasswordValidator') requiredPattern!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const pattern = new RegExp(this.requiredPattern);
      const isValid = pattern.test(control.value);

      if (!isValid) {
        return { passwordPattern: true };
      }
    }
    return null;
  }
}


export function match(controlName: string, checkControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const checkControl = formGroup.controls[checkControlName];

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      checkControl?.setErrors({ notMatching: true });
      return { notMatching: true };
    } else {
      checkControl?.setErrors(null);
      return null;
    }
  };
}

@Directive({
  standalone:true,
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return match(
      this.matchPassword[0],
      this.matchPassword[1]
    )(formGroup);
  }
}

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatchPasswordDirective, PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { InputMaskDirective } from '../../directives/input-mask.directive';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,PasswordValidatorDirective,MatchPasswordDirective,AutofocusDirective,InputMaskDirective]
})
export class InputValidationComponent {
  @ViewChild('userForm') userForm!:NgForm
  user = {
    password:'',
    confirmPassword:''
  }
  isSubmit = false;
  onFormSubmit() {
    this.isSubmit = true;
    if(this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value);
  }
}

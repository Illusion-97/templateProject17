import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { AbstractFormComponent } from '../../tools/abstract-form-component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [ReactiveFormsModule, ErrorMessageComponent]
})
export class RegisterComponent extends AbstractFormComponent {
  visible: boolean = false

  password: FormControl = new FormControl("", {validators: [Validators.required, Validators.minLength(6)]})
  confirmPassword : FormControl = new FormControl("", {validators: [Validators.required, this.mustMatch(this.password)]})

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", {validators: [Validators.required, Validators.maxLength(15)]}),
    email: new FormControl("", {validators: [Validators.required, Validators.email]}),
    password: this.password,
  })


  constructor(private router: Router) {
    super()
  }

  onSubmit$(): void {
    this.confirmPassword.markAsTouched()
    if(this.confirmPassword.valid) {
      console.log("USER", this.form.value)
      this.router.navigate(['/auth/login'])      
    }
  }
}

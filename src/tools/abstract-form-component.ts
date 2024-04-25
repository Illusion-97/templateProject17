import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export abstract class AbstractFormComponent {
  abstract form: FormGroup

  getControl(control: AbstractControl | string) {
    if (typeof control === "string") {
      const c = this.form.get(control)
      if (!c) throw new Error('Le controle est introuvable')
      control = c
    }
    return control
  }

  hasInteraction(control: AbstractControl | string) {
    control = this.getControl(control)
    return (control.touched || control.dirty)
  }

  isInvalid(control: AbstractControl | string) {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.invalid
  }

  hasError(control: AbstractControl | string, errorCode: string) {
    control = this.getControl(control)
    return this.hasInteraction(control) && control.hasError(errorCode)
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.onSubmit$()
    }
  }

  abstract onSubmit$(): void

  mustMatch(matchingControl: AbstractControl): ValidatorFn { // ValidatorFn retourne une fonction
    return (control: AbstractControl): ValidationErrors | null => { // control est celui sur lequel on applique le validateur
        const error: ValidationErrors = {
            // errorCode : value
            mustmatch: "Ne match pas !"
        }
        return control.value !== matchingControl.value ? error : null
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, ErrorMessageComponent]
})
export class LoginComponent {

  credentials: {email:string; password:string} = {
    email: '',
    password: ''
  }

  /*onSubmit(form: HTMLFormElement) {
    if(form.checkValidity())
      console.log("CREDENTIALS :", this.credentials)
  }*/

  onSubmit(valid: boolean) {
    if(valid)
      console.log("CREDENTIALS :", this.credentials)
  }
}

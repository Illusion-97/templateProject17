import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HomeComponent } from "../views/home/home.component";
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";

@Component({
    selector: 'app-root', // nom de la balise à utiliser pour appeler ce composant
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent, HomeComponent, TitleCasePipe, UpperCasePipe, LoginComponent, RegisterComponent]
})
export class AppComponent {
  title = 'templateProject';

  reactToChild(value: string) { // En réaction à un evenement, la value se récupère dans l'html avec '$event'
    console.log("Child asks : " + value)
  }
}

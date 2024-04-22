import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // visibilite nom: type = valeur
  /*private*/ titre : string = "Editorial" // Par défaut la visibilité est 'public' (on peut parfois retrouver 'protected')
}

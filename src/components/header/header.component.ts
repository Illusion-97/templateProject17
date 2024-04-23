import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthorPipe } from '../../pipes/author.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, AuthorPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // visibilite nom: type = valeur
  @Input()
  /*private*/ titre : string = "Editorial" // Par défaut la visibilité est 'public' (on peut parfois retrouver 'protected')

  moi: Personne = {
    nom: 'ADEKALOM',
    prenom: 'Yanis'
  }

  // Créer un pipe 'author' qui prends en valeur un objet de type Personne et qui renvoie une string sous ce format : 'by NOM Prenom'
}

export interface Personne {
  nom: string;
  prenom: string;
}

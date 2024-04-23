import { Pipe, PipeTransform } from '@angular/core';
import { Personne } from '../components/header/header.component';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(value: Personne): string {
    return `by ${value.nom.toUpperCase()} ${new TitleCasePipe().transform(value.prenom)}`;
  }

}

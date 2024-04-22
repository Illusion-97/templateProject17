import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule], // FormsModule permet l'utilisation de 'ngModel'
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // @Input({required: true}) OBLIGES de fournir l'information demandée pour utiliser ce composant
  @Input({required: true}) childValue! : string; // assure au code qu'on aura toujours une valeur du type correspondant et pas de undefined
  @Output() childValueChange: EventEmitter<string> = new EventEmitter() // l'Ouput porte le nom de l'Input suivi de 'Change'
  // Rendre une variable 'optionnelle'
  // @Input({required: true}) childValue: string | undefined = undefined;
  // @Input({required: true}) childValue?: string = undefined;

  get search() {
    return this.childValue
  }

  set search(value) {
    this.childValue = value;
    this.childValueChange.emit(this.childValue)
  }

  onValueChange($event: Event) {

    //@ts-ignore
    //console.log($event.target.value)

    const target : HTMLInputElement = $event.target as HTMLInputElement // cast
    this.childValue = target.value;
    this.childValueChange.emit(this.childValue)
    // this.childValue = ($event.target as HTMLInputElement).value;
  }
}

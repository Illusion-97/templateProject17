import { Component, EventEmitter, Output } from '@angular/core';
import { MiniPost, MiniPostComponent } from "../mini-post/mini-post.component";
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    imports: [MiniPostComponent, SearchComponent]
})
export class SidebarComponent {
    @Output() // Prépare le composant à ENVOYER une information au parent (composant qui apelle celui-ci)
    ask: EventEmitter<string> = new EventEmitter<string>(); // Un Ouput est toujours un EventEmitter d'un type de données

    parentValue: string = "Parent Value"

    minipost1: MiniPost = {
        href: '#',
        src: 'pic02.jpg',
        alt: 'Halte',
        text: 'Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam.'
    }

    askForMore() {
        this.ask.emit("I want More !") // Déclenche effectivement un evenement au travers de l'emitter
        // La donnée envoyée dans l'emit sera récupérable avec '$event'
    }

    reactToChildValueChange(value: string) {
        this.parentValue = value
    }
}

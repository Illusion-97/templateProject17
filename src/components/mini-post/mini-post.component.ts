import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-mini-post',
    standalone: true,
    templateUrl: './mini-post.component.html',
    styleUrl: './mini-post.component.css',
    imports: []
})
export class MiniPostComponent {
  @Input() // Prépare le composant à RECEVOIR une information depuis un parent (composant qui apelle celui-ci)
  post: MiniPost = {
    href: '#',
    src: 'pic07.jpg',
    alt: 'Halte',
    text: 'Lorem'
  }

  @Input() first: boolean = false
}

export interface MiniPost { // Définir la structure d'un MiniPost
  href: string
  src?: string // equivalent -> src: string | undefined
  alt: string
  text: string
}
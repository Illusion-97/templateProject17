import { Component } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data!: Observable<Article[]>

  constructor(private service: ArticleService) {
    this.fecthAll()
  }

  fecthAll() {
    this.data = this.service.all()
  }
}

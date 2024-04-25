import { Component } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { subscribeOnce } from '../../tools/ObservableHelper';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data!: Observable<Article[]>

  constructor(private service: ArticleService, protected auth: AuthService) {
    this.fecthAll()
  }

  fecthAll() {
    this.data = this.service.all()
  }

  delete(id: number) {
    subscribeOnce(this.service.delete(id), () => this.fecthAll())
  }
}

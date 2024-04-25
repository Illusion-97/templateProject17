import { Component, inject } from '@angular/core';
import { AbstractFormComponent } from '../../tools/abstract-form-component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, finalize, of,throwError } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { subscribeOnce } from '../../tools/ObservableHelper';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent extends AbstractFormComponent {

  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    src: new FormControl(""),
    alt: new FormControl("", {validators: [Validators.required]}),
    titre: new FormControl("", {validators: [Validators.required]}),
    description: new FormControl("", {validators: [Validators.required]}),
    lien: new FormControl("", {validators: [Validators.required]})
  })

  constructor(route: ActivatedRoute, private service: ArticleService, private router: Router) {
    super()
    route.data.subscribe({
      next: ({article}) => { // data -> data['article'] <=> ({article})
        if(article) this.form.patchValue(article)
        else this.form.reset()
      }
    })
  }

  onSubmit$() {
    subscribeOnce(
      this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value), 
      {
        next: () => this.router.navigate(['/'])
      })
  }
}

export const articleResolver: ResolveFn<Observable<Article | undefined>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const id: number = +(route.paramMap.get('id') ?? "0")
  return id && !isNaN(id) 
    ? inject(ArticleService).byId(id).pipe(catchError(err => {
      router.navigate(['/editor/0'])
      return throwError(() => err)
    })) 
    : of(undefined)
}
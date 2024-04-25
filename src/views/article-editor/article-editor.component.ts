import { Component } from '@angular/core';
import { AbstractFormComponent } from '../../tools/abstract-form-component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, finalize, of, throwError } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { subscribeOnce } from '../../tools/ObservableHelper';

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
    const paramMap : ParamMap = route.snapshot.paramMap
    console.log('id', paramMap.get('id'))

    // Un observable permet de suivre les changements sur une donnée
    const observableParamMap: Observable<ParamMap> = route.paramMap
    observableParamMap.subscribe({
      // Récupération d'une nouvelle valeur sans accrocs
      next: value => console.log('observable id', value.get('id')),
      // Erreur durant la récupération d'une valeur
      error: err => console.log("ERROR : ", err),
      // Fin des appels
      complete: () => console.log("Observable complété")
    })
  }

  onSubmit$() {
    subscribeOnce(
      this.service.save(this.form.value), // Observable auquel souscrire une fois
      { // Comment réagir a cet observable
        next: () => this.router.navigate(['/'])
      })
  }
}

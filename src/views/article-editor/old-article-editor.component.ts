import { Component, inject } from '@angular/core';
import { AbstractFormComponent } from '../../tools/abstract-form-component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription, finalize, of, switchMap, throwError } from 'rxjs';
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
    // nonNullable: true permet de récupérer la valeur initiale lors du reset
    alt: new FormControl("Un Texte Alternatif", {validators: [Validators.required], nonNullable:true}),
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
    /*observableParamMap.subscribe({
      // Récupération d'une nouvelle valeur sans accrocs
      next: value => {
        // const id: string = value.get('id') || "0" -> si value.get('id') renvoie null alors id prendra la valeur "0"
        const id: number = +(value.get('id') ?? "0") // ?? equivaut à || en étant adapté pour le cas du type null (Null Coalersing Operator)
        if(id) subscribeOnce(service.byId(id), {
          next: article => this.form.patchValue(article),
          error: () => this.router.navigate(['/editor/0'])
        })
        else {
          // Réinitialiser en fournissant une valeur (demande une correspondace d'attribut)
          this.form.reset({
            titre: "Un Nouveau Titre"
          })
        }
      },
      // Erreur durant la récupération d'une valeur
      error: err => console.log("ERROR : ", err),
      // Fin des appels
      complete: () => console.log("Observable complété")
    })*/
    // switchMap permet de passer d'un observable a un autre
    /*observableParamMap.pipe(switchMap(paramMap => {
      const id: number = +(paramMap.get('id') ?? "0")
      if(id && !isNaN(id)) return service.byId(id)
        // creer un observable qui déclenchera uniquement le cas error
      else return throwError(() => new Error('Article Id invalide'))
    })).subscribe({
      next: article => this.form.patchValue(article),
      error: () => {
          if(!this.form.value.id) this.router.navigate(['/editor/0']).then(() => this.form.reset({
          titre: "Un Nouveau Titre"
        }))
      }
    })*/
  }

  onSubmit$() {
    /*if(this.form.value.id) {
      subscribeOnce(
        // Observable auquel souscrire une fois
        this.service.update(this.form.value), 
        { // Comment réagir a cet observable
          next: () => this.router.navigate(['/'])
        })
    } else {
      subscribeOnce(
        // Observable auquel souscrire une fois
        this.service.save(this.form.value), 
        { // Comment réagir a cet observable
          next: () => this.router.navigate(['/'])
        })
    }*/

    /*const obs = this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value)
    subscribeOnce(
      // Observable auquel souscrire une fois
      obs, 
      { // Comment réagir a cet observable
        next: () => this.router.navigate(['/'])
      })*/

    subscribeOnce(
      // Observable auquel souscrire une fois
      this.form.value.id ? this.service.update(this.form.value) : this.service.save(this.form.value), 
      { // Comment réagir a cet observable
        next: () => this.router.navigate(['/'])
      })
  }
}

export const articleResolver: ResolveFn<Observable<Article | undefined>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id: number = +(route.paramMap.get('id') ?? "0")
  return id && !isNaN(id) ? inject(ArticleService).byId(id) : of(undefined)
}
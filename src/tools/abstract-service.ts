import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class AbstractService<T> {

    abstract readonly ENDPOINT: string
  
    constructor(protected http: HttpClient) { }
  
    all(): Observable<T[]> {
      return this.http.get<T[]>(this.ENDPOINT);
    }
  
    byId(id: number): Observable<T> {
      return this.http.get<T>(`${this.ENDPOINT}/${id}`);
    }
  
    save(object: T): Observable<T> {
      return this.http.post<T>(this.ENDPOINT, object);
    }
  
    update(object: T): Observable<T> { // Mise à jour complete (ecrasement avec la structure EXACTE)
      return this.http.put<T>(this.ENDPOINT, object);
    }
  
    /*partialUpdate(object: T): Observable<T> { // Mise à jour partielle (ecrasement UNIQUEMENT des champs renseignés)
      return this.http.patch<T>(`${this.ENDPOINT}/${object.id}`, object);
    }*/
  
    delete(id: number): Observable<never> {
      return this.http.delete<never>(`${this.ENDPOINT}/${id}`);
    }
}

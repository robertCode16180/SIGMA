import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Separador } from '../interfaces/equipos';

@Injectable({
  providedIn: 'root'
})
export class SigmaServerService {

  private apiUrl = 'https://sigma-api-server-test.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public getSeparadores(): Observable<Separador[]> {
    return this.http.get(this.createQuery('separadores'), this.generateHeaders())
                    .pipe(map( (data: any) => data.equipos));
  }

  public agregarSeparador = (body: Separador): Observable<HttpEvent<any>> => {
    return this.http.post(this.createQuery('separadores'), body, {reportProgress: true, observe: 'events'});
  }

  public editarSeparador = (body: Separador): Observable<HttpEvent<any>> => {
    return this.http.put(this.createQuery('separadores', body._id), body, {reportProgress: true, observe: 'events'});
  }

  public eliminarSeparador = (body: Separador): Observable<HttpEvent<any>> => {
    return this.http.delete(this.createQuery('separadores', body._id), {reportProgress: true, observe: 'events'});
  }

  private createQuery = (route: string, param?: string) => {
    if (param) {
      return `${this.apiUrl}/${route}/${param}`;
    } else {
      return `${this.apiUrl}/${route}`;
    }
  }

  private generateHeaders = (): { headers: HttpHeaders } => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public rootUrl: String = environment.rootUrl;
  constructor(private http: HttpClient, ) { }
  
  findDropDowns() {
    return this.http.get(`${this.rootUrl}/store/filters`);
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .get(`${this.rootUrl}/store/hints`, { params: PARAMS.set('search', term) }).pipe(
        map(response => {
          return response;
        })
      );
  }

  startSearch(query) {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      if (query[key] instanceof Array) {
        (<string[]>query[key]).forEach(item => {
          params = params.append(key, item);
        });
        return;
      }
      params = params.append(key, (<number>query[key]).toString());
    });

    return this.http.get(`${this.rootUrl}/store/search`, { params })
  }

}

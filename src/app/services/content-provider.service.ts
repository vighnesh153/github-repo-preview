import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentProviderService {

  constructor(private http: HttpClient) { }

  getRepositories(belongsTo: string, ownerName: string): Observable<any> {
    const rootUrl = environment.githubApiRoot;
    const reposUrl = `${rootUrl}/${belongsTo}/${ownerName}/repos`;

    return this.http.get(reposUrl).pipe(take(1));
  }
}

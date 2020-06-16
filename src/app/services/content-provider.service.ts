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

  getDirContent(url: string): Observable<any> {
    return this.http.get(url).pipe(take(1));
  }

  getRawFileContent(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' }).pipe(take(1));
  }

  getExtension(url: string): string {
    const urlParts = url.split('/');
    while (urlParts[urlParts.length - 1].length === 0) {
      urlParts.pop();
    }

    const fileName = urlParts[urlParts.length - 1];
    if (fileName.indexOf('.') === -1) {
      return fileName;
    }
    const fileParts = fileName.split('.');
    return fileParts[fileParts.length - 1];
  }
}

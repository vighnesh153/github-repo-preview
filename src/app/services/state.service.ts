import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Repository } from 'src/app/models/Repository';
import { Code } from 'src/app/models/Code';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  repositorySubject = new BehaviorSubject<Repository>(null);
  fileContentSubject = new BehaviorSubject<Code>({
    value: 'Welcome to Github Repository Explorer',
    extension: 'txt'
  });

  constructor(private router: Router) { }

  setRepo(repo: Repository): void {
    this.repositorySubject.next(repo);
    this.router.navigate(['/repo-ls']).then();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Repository } from 'src/app/models/Repository';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  repositorySubject = new BehaviorSubject<Repository>(null);

  constructor(private router: Router) { }

  setRepo(repo: Repository): void {
    this.repositorySubject.next(repo);
    this.router.navigate(['/repo-ls']).then();
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepoLsGuard implements CanActivate {
  constructor(private stateService: StateService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (environment.production === false) {
      return true;
    }

    if (this.stateService.repositorySubject.value !== null) {
      return true;
    }

    return this.router.createUrlTree(['/']);
  }

}

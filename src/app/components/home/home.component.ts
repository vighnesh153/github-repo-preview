import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContentProviderService } from 'src/app/services/content-provider.service';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Repository } from 'src/app/models/Repository';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/Toast';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  placeHolderMappings = {
    users: 'Github Username',
    orgs: 'Github Organization name'
  };

  form = new FormGroup({
    belongsTo: new FormControl('users'),
  });

  ownerName = '';
  isSearchDisabled = false;

  repositories: Repository[] = [];

  get belongsTo(): string {
    return this.form.value.belongsTo;
  }

  constructor(private contentProvider: ContentProviderService,
              private toastService: ToastService,
              private stateService: StateService) {
  }

  ngOnInit(): void {
    if (environment.production === false) {
      this.repositories = [
        {
          contents_url: 'DUMMY_URL',
          full_name: 'user/repository-1',
          name: 'repository-1'
        },
        {
          contents_url: 'DUMMY_URL',
          full_name: 'user/repository-2',
          name: 'repository-2'
        },
        {
          contents_url: 'DUMMY_URL',
          full_name: 'user/repository-3',
          name: 'repository-3'
        },
        {
          contents_url: 'DUMMY_URL',
          full_name: 'user/repository-4',
          name: 'repository-4'
        },
      ];
    }
  }

  searchRepos() {
    if (this.isSearchDisabled) {
      return;
    }
    this.isSearchDisabled = true;
    this.contentProvider.getRepositories(this.belongsTo, this.ownerName)
      .subscribe({
        next: (repos: Repository[]) => {
          this.repositories = repos;
          if (repos.length === 0) {
            this.toastService.broadcast('User has no repos', ToastType.INFO);
          }
          this.isSearchDisabled = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.toastService.broadcast(error.error.message, ToastType.ERROR);
          this.isSearchDisabled = false;
        },
        complete: () => {}
      });
  }

  browse(repo: Repository) {
    this.stateService.setRepo(repo);
  }

}

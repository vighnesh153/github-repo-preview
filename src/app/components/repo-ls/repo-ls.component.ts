import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Repository } from 'src/app/models/Repository';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Code } from 'src/app/models/Code';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/Toast';

@Component({
  selector: 'app-repo-ls',
  templateUrl: './repo-ls.component.html',
  styleUrls: ['./repo-ls.component.scss']
})
export class RepoLsComponent implements OnInit, OnDestroy {
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    readOnly: true,
  };

  code = '';
  showEditor = true;

  repository: Repository = environment.devRepository;

  codeSubscription: Subscription;

  constructor(private state: StateService,
              private toast: ToastService) { }

  ngOnInit(): void {
    if (environment.production) {
      this.repository = this.state.repositorySubject.value;
    }
    this.codeSubscription = this.state.fileContentSubject
      .subscribe({
        next: (code) => {
          this.code = code.value.toString();
          this.editorOptions.language = environment.extensionToLangMapping[code.extension];
          this.showEditor = false;
          setTimeout(() => {
            this.showEditor = true;
          }, 0);
        },
        error: (error: HttpErrorResponse) => {
          this.toast.broadcast(error.error.message, ToastType.ERROR);
        }
      });
  }

  ngOnDestroy() {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
  }

}

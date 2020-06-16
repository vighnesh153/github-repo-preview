import { Component, Input, OnInit } from '@angular/core';
import { RepoFile, RepoFileComparer } from 'src/app/models/RepoFile';
import { ContentProviderService } from 'src/app/services/content-provider.service';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastType } from 'src/app/models/Toast';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {
  @Input() isDir = false;
  @Input() isExpanded = false;
  @Input() contentsUrl = '';
  @Input() downloadUrl = '';
  @Input() fileName = 'I am a dummy file name';

  contents: RepoFile[] = [];

  constructor(private contentProvider: ContentProviderService,
              private state: StateService,
              private toast: ToastService) { }

  ngOnInit(): void {
    if (this.isDir && this.isExpanded) {
      if (environment.production) {
        const urlParts = this.contentsUrl.split('/');
        urlParts.pop();
        this.contentsUrl = urlParts.join('/');
      }
      this.expandTree();
    }
  }

  collapseTree(): void {
    this.isExpanded = false;
  }

  expandTree(): void {
    this.isExpanded = true;
    if (this.contents.length > 0) {
      return;
    }
    this.contentProvider.getDirContent(this.contentsUrl)
      .subscribe({
        next: (response: RepoFile[]) => {
          this.contents = response;
          this.contents.sort(RepoFileComparer);
        },
        error: (error: HttpErrorResponse) => {
          this.toast.broadcast(error.error.message, ToastType.ERROR);
        }
      });
  }

  openRegularFile(): void {
    if (this.isDir) {
      this.isExpanded ? this.collapseTree() : this.expandTree();
      return;
    }
    this.contentProvider.getRawFileContent(this.downloadUrl)
      .subscribe({
        next: (code: string) => {
          this.state.fileContentSubject.next({
            value: code,
            extension: this.contentProvider.getExtension(this.downloadUrl)
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.error) {
            this.toast.broadcast(error.error.message, ToastType.ERROR);
          } else {
            this.toast.broadcast(error.message, ToastType.ERROR);
          }
          console.error(error);
        }
      });
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast, ToastType } from 'src/app/models/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSubject = new Subject<Toast>();

  constructor() {}

  broadcast(message: string, type: ToastType) {
    this.toastSubject.next({ message, type });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  showToast(message: string, type: 'success' | 'error') {
    const newToast: Toast = { message, type };
    this.toastsSubject.next([...this.toastsSubject.value, newToast]);

    setTimeout(() => {
      this.removeToast(newToast);
    }, 3000);
  }



  private removeToast(toast: Toast) {
    const currentToasts = this.toastsSubject.value;
    const index = currentToasts.indexOf(toast);
    if (index >= 0) {
      currentToasts.splice(index, 1);
      this.toastsSubject.next([...currentToasts]);
    }
  }
}

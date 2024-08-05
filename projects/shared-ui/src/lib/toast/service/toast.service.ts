import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast.component';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'success' },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  showError(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'error' },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
  cancel(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'cancel' },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}

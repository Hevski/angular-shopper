import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) {
  }

  /**
   * Activates a snackbar on error
   * @param errorMessage message displayed in snackbar
   * @param styleClass styling for snackbar
   */
  onError(errorMessage: string, styleClass: any): any {
    this.snackbar.open(errorMessage, 'Close', {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [styleClass],
    });
  }

  /**
   * Activates a snackbar on success
   * @param message message displayed in snackbar
   * @param styleClass styling for snackbar
   */
  onSuccess(message: string, styleClass: any): any {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [styleClass],
    });
  }
}
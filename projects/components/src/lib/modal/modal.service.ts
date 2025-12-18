import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRef?: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  open<T>(component: ComponentType<T>, data?: any): MatDialogRef<T> {
    this.dialogRef = this.dialog.open(component, {
      width: '600px',
      data: data,
      panelClass: 'custom-modal-panel'
    });
    return this.dialogRef;
  }

  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

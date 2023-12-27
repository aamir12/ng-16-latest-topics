import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { ConfirmDialogData } from 'src/app/components/confirm/confirm.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}
  confirmDialog(data: ConfirmDialogData,config:Partial<MatDialogConfig>={}): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        width: config.width || '400px',
        disableClose: true,
        enterAnimationDuration:200,
        position: config.position || {top:'100px'}
      })
      .afterClosed();
  }
}

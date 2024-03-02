import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LazyDialogService {

  constructor(private dialog: MatDialog) {}

  async openDialog(dialogName: string,data:any): Promise<any> {
    const chunk = await import(
      `../dialogs/${dialogName}/${dialogName}.component`
    );
    const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
    return lastValueFrom(this.dialog.open(dialogComponent,{
      data:data,
      width:"500px"
    }).afterClosed());
  }

  
}

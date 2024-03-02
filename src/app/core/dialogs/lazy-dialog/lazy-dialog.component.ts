import { Component, Inject, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lazy-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './lazy-dialog.component.html',
  styleUrl: './lazy-dialog.component.scss'
})
export class LazyDialogComponent  implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<LazyDialogComponent>,
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }
}

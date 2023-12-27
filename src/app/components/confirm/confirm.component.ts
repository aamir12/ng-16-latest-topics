import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}

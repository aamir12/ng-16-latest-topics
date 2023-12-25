import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-lazy-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './lazy-dialog.component.html',
  styleUrl: './lazy-dialog.component.scss'
})
export class LazyDialogComponent {

}

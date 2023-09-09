import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-ng-deep',
  templateUrl: './ng-deep.component.html',
  styleUrls: ['./ng-deep.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule],
})
export class NgDeepComponent {

}

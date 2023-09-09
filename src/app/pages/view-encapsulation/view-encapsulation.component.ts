import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-view-encapsulation',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './view-encapsulation.component.html',
  styleUrls: ['./view-encapsulation.component.scss']
})
export class ViewEncapsulationComponent {

}

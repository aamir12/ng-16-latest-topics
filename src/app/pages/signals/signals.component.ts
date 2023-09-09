import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent {

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { DemoLinkComponent } from 'src/app/components/demo-link/demo-link.component';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule,MaterialModule,DemoLinkComponent],
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent {

}

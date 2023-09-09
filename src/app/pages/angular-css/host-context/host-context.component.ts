import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-host-context',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './host-context.component.html',
  styleUrls: ['./host-context.component.scss']
})
export class HostContextComponent {

}

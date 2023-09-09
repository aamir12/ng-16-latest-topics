import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule],
})
export class OtherPageComponent {

}

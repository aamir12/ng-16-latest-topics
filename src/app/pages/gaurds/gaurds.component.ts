import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';

@Component({
  selector: 'app-gaurds',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './gaurds.component.html',
  styleUrls: ['./gaurds.component.scss']
})
export class GaurdsComponent {

}

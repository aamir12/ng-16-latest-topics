import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { NgTemplateOutletComponent } from '../ng-template-outlet/ng-template-outlet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule,NgTemplateOutletComponent],
})
export class HomeComponent {
  

}

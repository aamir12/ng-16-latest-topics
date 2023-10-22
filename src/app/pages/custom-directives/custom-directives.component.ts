import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-directives',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './custom-directives.component.html',
  styleUrls: ['./custom-directives.component.scss']
})
export class CustomDirectivesComponent {

}

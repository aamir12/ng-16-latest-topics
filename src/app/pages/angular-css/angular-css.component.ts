import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { RouterModule } from '@angular/router';
import { DemoLinkComponent } from 'src/app/components/demo-link/demo-link.component';

@Component({
  selector: 'app-angular-css',
  standalone: true,
  imports: [CommonModule,RouterModule, MaterialModule,DemoLinkComponent],
  templateUrl: './angular-css.component.html',
  styleUrls: ['./angular-css.component.scss']
})
export class AngularCssComponent {

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { HostContextComponent } from './host-context/host-context.component';
import { NgDeepComponent } from './ng-deep/ng-deep.component';
import { OtherPageComponent } from './other-page/other-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-angular-css',
  standalone: true,
  imports: [CommonModule,RouterModule, MaterialModule],
  templateUrl: './angular-css.component.html',
  styleUrls: ['./angular-css.component.scss']
})
export class AngularCssComponent {

}
